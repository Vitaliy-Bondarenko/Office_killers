# frozen_string_literal: true

class Api::V1::PlayersController < ApplicationController
  def create
    if game.present? && game.validate_entry(current_user.id)
      game.players.create(user_id: current_user.id)
      render json: game
    else
      flash[:alert] = 'You have errors!'
      render json: { status: :conflict }
    end
  end

  def death_confirm
    player.death_confirm! if player.alive?
    PlayerNotificationJob.perform_later(Player.where('target_ids <@ ARRAY[?]', player.id).ids[0])
  end

  def player_killed
    if target_info.death_confirm?
      target_info.dead!
      player.killed_targets << target_info.id
      player.save
    end
    return check_players_count if players.where.not(status: :dead).count == 2

    PlayerNotificationJob.perform_later(player.id)
    player.target_ids << target_info.target_id
    player.target_id = target_info.target_id
    player.save
    render json: { status: :ok }
  end

  def error_death
    target_info.alive! unless target_info.dead?
    render json: {}, status: :accepted
  end

  def destroy
    player.destroy
    render json: {}, status: :accepted
  end

  def ban_player
    return if player.game.owner_id == player.user.id

    player.game.banned_users << player.user.id
    player.game.save
    player.destroy
    render json: {}, status: :accepted
  end

  def unban_player
    game = Game.find_by(id: params[:game_id])
    game.update(banned_users: game.banned_users - [(User.find_by(id: params[:id]).id)] || [])
    render json: {}, status: :accepted
  end

  private

  def check_players_count
    return unless current_user.current_game.status == 'in_progress'

    current_user.current_game.update(
      status: :finished,
      finish_time: DateTime.now
    ) && game_finished
    render json: { status: 'finished' }
  end

  def game_finished
    current_user.current_game.users.where(notify_game_finish: true).find_each do |user|
      GameNotificationJob.perform_later(user.id)
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
