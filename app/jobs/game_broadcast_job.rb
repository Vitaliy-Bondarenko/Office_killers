# frozen_string_literal: true

class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    ActionCable.server.broadcast "games_#{user_id}", {}
  end
end
