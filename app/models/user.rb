# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :first_name, presence: true

  has_many :players, dependent: :destroy
  has_many :games, through: :players
  has_one :current_player, -> { order_by_last }, class_name: 'Player'
  has_one :current_game, through: :current_player, source: :game

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
