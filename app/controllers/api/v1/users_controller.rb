# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def show
    render json: user && UserSerializer.new(user).as_json unless user.nil?
  end

  def all_info
    render json: { user: user, game: user.current_game && GameSerializer.new(user.current_game).as_json, player: user.current_player && PlayerSerializer.new(user.current_player).as_json }
  end

  def update
    if current_user.update(user_params)
      render json: { status: :success }
    else
      render json: { status: current_user.errors.full_messages.to_sentence }
    end
  end

  private

  def user
    User.find_by(id: params[:id])
  end

  def user_params
    parsed_params.require(:user).permit(:first_name,
                                        :last_name,
                                        :notify_game_start,
                                        :notify_game_finish,
                                        :news,
                                        :image_URL,
                                        :notif_token)
  end
end
