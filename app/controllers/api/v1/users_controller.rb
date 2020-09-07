# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def update
    return unless current_user.update(user_params)
    render json: { status: :ok }
  end

  private

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
