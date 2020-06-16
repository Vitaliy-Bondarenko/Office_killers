# frozen_string_literal: true

class Api::V1::PlayersController < ApplicationController
  def create
    if game.present? && game.unstarted?
      game.players.create(user_id: current_user.id)
      render json: game
    else
      flash[:alert] = 'You has errors!'
      render json: { status: :conflict }
    end
  end

  def death_confirm
    player.death_confirm! if player.alive?
  end

  def player_killed
    target_info.dead! if target_info.death_confirm?
    if players.alive.count == 2
      return current_user.current_game.update(
        status: :finished,
        finish_time: DateTime.now
      ) && game_finished
    end
    player.target_ids << target_info.target_id
    player.target_id = target_info.target_id
    player.save
    ModelMailer.new_target(current_user.id).deliver_later if current_user.news?
    ActionCable.server.broadcast('notification_channel', 'You have new target!')
  end

  def error_death
    target_info.alive! unless target_info.dead?
  end

  def destroy
    player.destroy
    render json: {}, status: :accepted
  end

  private

  def game_finished
    current_user.current_game.users.where(notify_game_finish: true).find_each do |user|
      ModelMailer.game_finished(user).deliver_later
      ActionCable.server.broadcast('notification_channel', 'Your game has finished!')
    end
  end

  def target_info
    player.target
  end

  def players
    current_user.current_game.players
  end

  def game
    @game ||= Game.unstarted.find_by(game_params)
  end

  def game_params
    parsed_params.require(:game).permit(:code)
  end
end
