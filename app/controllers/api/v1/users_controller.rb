# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def update
    return unless current_user.update(user_params)
    render json: { first_name: current_user.first_name,
                   last_name: current_user.last_name,
                   notify_game_start: current_user.notify_game_start,
                   notify_game_finish: current_user.notify_game_finish,
                   news: current_user.news,
                   image_URL: current_user.image_URL }, status: :ok
  end

  private
  def parsed_params
    @parsed_params ||= ActionController::Parameters.new(JSON.parse(request.body.read, symbolize_names: true))
  end

  def user_params
    parsed_params.require(:user).permit(:first_name,
                                        :last_name,
                                        :notify_game_start,
                                        :notify_game_finish,
                                        :news,
                                        :image_URL)
  end
end
