# frozen_string_literal: true

class Users::OmniauthController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.persisted?
      if game.present? && @user.current_game.blank?
        sign_in @user
        game.players.create(user_id: current_user.id)
        cookies.delete(:code)
        redirect_to '/game'
      else
        sign_in_and_redirect @user
        flash[:notice] = 'Login success'
      end
    else
      redirect_to new_user_registration_url
    end
  end

  def failure
    flash[:notice] = 'Login failed'
    redirect_to root_path
  end

  private

  def game
    @game ||= Game.unstarted.find_by(code: cookies[:code])
  end
end
