# frozen_string_literal: true

class GameBroadcastJob < ApplicationJob
  queue_as :default

  def perform(user_id, additional_params)
    user = User.find_by(id: user_id)
    ActionCable.server.broadcast "games_#{user_id}", { game: GameSerializer.new(user.current_game),
                                                       player: PlayerSerializer.new(user.current_player),
                                                       additional_params: additional_params}
  end
end
