# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :omniauthable, omniauth_providers: [:google_oauth2]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :first_name, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :players, dependent: :destroy
  has_many :games, through: :players
  has_one :current_player, -> { order('created_at desc') }, class_name: 'Player'
  has_one_attached :avatar
  has_one :current_game, through: :current_player, source: :game

  def self.from_omniauth(auth)
    where(email: auth.info.email).first_or_initialize do |user|
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user_avatar = open(auth.info.image)
      user.avatar.attach(io: user_avatar, filename: "#{user.email}_avatar.jpg", content_type: user_avatar.content_type)
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.save!
    end
  end
end
