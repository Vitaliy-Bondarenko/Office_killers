# frozen_string_literal: true

class Api::V1::PlayersController < ApplicationController
  def create
    if game.present?
      game.players.create(user_id: current_user.id)
      render json: game
    else
      flash[:alert] = 'You has errors!'
      render json: { status: :conflict }
    end
  end

  def destroy
    player.destroy
    render json: {}, status: :accepted
  end

  private

  def game
    @game ||= Game.find_by(game_params)
  end

  def game_params
    parsed_params.require(:game).permit(:code)
  end
end
