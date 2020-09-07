# frozen_string_literal: true

class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    @user = User.find_by(id: user_id)
    ActionCable.server.broadcast "games_#{user_id}", { game: @user.current_game }
  end
end
