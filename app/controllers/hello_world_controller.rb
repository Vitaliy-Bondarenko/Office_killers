# frozen_string_literal: true

class HelloWorldController < ApplicationController
  layout 'hello_world'

  def index
    @hello_world_props = { first_name: current_user&.first_name || 'Stranger',
                           last_name: current_user&.last_name,
                           id: current_user&.id,
                           image_URL: current_user&.image_URL }
  end
end
