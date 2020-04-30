# frozen_string_literal: true

class Api::V1::GamesController < ApplicationController
  def new
    game = Game.new(code: SecureRandom.hex(3))
    render json: game, status: :ok
  end

  def create
    game = Game.new(game_params.merge(owner_id: current_user.id, status: :unstarted))
    if game.save
      render json: game, status: :created
    else
      render json: { errors: game.errors }, status: :unprocessable_entity
    end
  end

  def killer_start
    return unless current_game.owner_id == current_user.id
    current_game.start_game
  end

  def destroy
    # TODO
    if game.in_progress?
      render json: {}, status: :conflict
    else
      game.destroy
      render json: {}, status: :accepted
    end
  end

  def update
    # TODO
    if game.update(game_params)
      render json: game, status: :accepted
    else
      render json: { errors: game.errors }, status: :unprocessable_entity
    end
  end

  private

  def current_game
    current_user.current_game
  end

  def game
    @game ||= Game.find(params[:id])
  end

  def game_params
    parsed_params.require(:game).permit(:code, :start_time)
  end
end
