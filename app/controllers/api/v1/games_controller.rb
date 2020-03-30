# frozen_string_literal: true

class Api::V1::GamesController < ApplicationController
  def new
    game = Game.new(code: SecureRandom.hex(4))
    render json: game
  end

  def create
    game = Game.create(started_at: current_game.created_at, status: current_game.in_progres!)
    renderr json: game
  end

  def destroy
    Game.destroy(params[:code]) unless Game.in_progress?
  end

  def update
    game = Game.find(params[:code])
    game.in_progress!
    render json: game
  end
end
