# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout 'hello_world'

  def index
    @hello_world_props = { current_user: current_user || nil,
                           current_game: current_game || nil,
                           user_id: current_user&.id,
                           current_player: current_user&.current_player &&
                                           PlayerSerializer.new(current_user&.current_player) }
  end

  private

  def current_game
    current_user&.current_game && GameSerializer.new(current_user.current_game)
  end
end
