# frozen_string_literal: true

class Api::V1::GamesController < ApplicationController
  def new
    game = Game.new(code: SecureRandom.hex(4))
    render json: game
  end

  def destroy
    Game.destroy(params[:code])
  end

  def update
    game = Game.find(params[:code])
    game.in_progress!
    render json: game
  end
end
