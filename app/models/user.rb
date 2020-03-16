# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_initialize do |user|
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.email = auth.info.email
      user.image_URL = auth.info.image
      user.password = Devise.friendly_token[0, 20]
      user.save!
    end
  end
end
