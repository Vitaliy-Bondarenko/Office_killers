# frozen_string_literal: true

class Player < ApplicationRecord
  belongs_to :game
  belongs_to :user
  belongs_to :target, optional: true, class_name: 'Player'
  delegate :email, to: :user, prefix: true

  after_update :game_broadcast
  after_update :player_notification, if: -> { saved_change_to_status? }
  after_create_commit :game_broadcast
  before_destroy :game_broadcast

  enum status: %i[alive dead death_confirm]

  scope :order_by_last, (-> { joins(:game).order('games.created_at desc') })
  scope :all_except, ->(user) { where.not(user_id: user) }
  scope :alive_users, -> { where(status: :alive) }

  def game_broadcast
    game.broadcast_game
  end

  def player_notification
    PlayerNotificationJob.perform_later(id)
  end
end
