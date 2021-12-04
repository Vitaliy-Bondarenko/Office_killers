# frozen_string_literal: true

class Api::V1::UsersController < ApplicationController
  def show
    render json: user && UserSerializer.new(user).as_json unless user.nil?
  end

  def all_info
    render json: { user: user, game: user.current_game && GameSerializer.new(user.current_game).as_json, player: user.current_player && PlayerSerializer.new(user.current_player).as_json }
  end

  def update
    if current_user.update(user_params.except(:avatar))
      attach_resized_image
      render json: { status: :success }
    else
      render json: { status: current_user.errors.full_messages.to_sentence }
    end
  end

  def update_notif_token
    current_user.update(notif_token: params[:notif_token])
  end

  private

  def attach_resized_image
    return if user_params[:avatar].nil?

    image_info = user_params['avatar'].as_json
    return unless ['image/png', 'image/jpg', 'image/jpeg'].include?(image_info['content_type'])

    image = MiniMagick::Image.new(user_params[:avatar].tempfile.path)
    if image[:width] > 800
      image.resize("20%")
    end
    current_user.avatar.attach(io: StringIO.open(image.to_blob), filename: image_info['original_filename'], content_type: image_info['content_type'])
  end

  def user
    User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name,
                                 :last_name,
                                 :notify_game_start,
                                 :notify_game_finish,
                                 :news,
                                 :notif_token,
                                 :avatar)
  end
end
