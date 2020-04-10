# frozen_string_literal: true

class Api::V1::PlayersController < ApplicationController
  def create
    if game.present?
      Player.create(game_id: game.id, user_id: current_user.id)
      render json: game
    else
      flash[:alert] = "You has errors!"
      render json: { status: :conflict }
    end
  end

  def destroy
    player.destroy
    render json: {}, status: :accepted
  end

  def game
    Game.find_by(game_params)
  end

  private

  def player
    @player ||= Player.find(params[:id])
  end

  def parsed_params
    @parsed_params ||= ActionController::Parameters.new(JSON.parse(request.body.read, symbolize_names: true))
  end

  def game_params
    parsed_params.require(:game).permit(:code)
  end
end
