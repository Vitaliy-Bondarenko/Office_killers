# frozen_string_literal: true

class GamesController < ApplicationController
  def show
    return redirect_to root_path if game.blank?
    if current_user.nil?
      cookies[:code] = game.code
      return redirect_to '/login'
    end
    return redirect_to '/game' if current_user.current_game.in_progress? || current_user.current_game.unstarted?
    game.players.create(user_id: current_user.id)
    redirect_to '/game'
  end

  private

  def game
    @game ||= Game.unstarted.find_by(code: params[:id])
  end
end
