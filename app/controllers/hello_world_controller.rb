# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout 'hello_world'

  def index
    @hello_world_props = { first_name: current_user&.first_name || 'Stranger',
                           last_name: current_user&.last_name,
                           user_id: current_user&.id,
                           image_URL: current_user&.image_URL,
                           notify_game_start: current_user&.notify_game_start,
                           notify_game_finish: current_user&.notify_game_finish,
                           news: current_user&.news,
                           owner_id: current_user&.current_game&.owner_id,
                           current_game: current_game,
                           current_player: current_user&.current_player &&
                                           PlayerSerializer.new(current_user&.current_player) }
  end

  private

  def current_game
    current_user&.current_game && GameSerializer.new(current_user.current_game)
  end
end
