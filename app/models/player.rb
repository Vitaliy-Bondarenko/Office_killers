# frozen_string_literal: true

class Player < ApplicationRecord
  belongs_to :game
  belongs_to :user
  belongs_to :target, optional: true, class_name: 'Player'
  delegate :email, :first_name, :last_name, to: :user, prefix: true

  after_create_commit :broadcast_to_game
  after_update_commit :broadast_to_all_players
  after_update :player_notification, if: -> { saved_change_to_status? }
  before_destroy :broadast_to_all_players

  enum status: %i[alive dead death_confirm]

  scope :all_except, ->(user) { where.not(user_id: user) }
  scope :alive_users, -> { where(status: :alive) }

  private

  def broadast_to_all_players
    game.changing_page_broadcast
  end

  def broadcast_to_game
    game.broadcast_game
  end

  def player_notification
    game.broadcast_individual(user_id)
    PlayerNotificationJob.perform_later(id)
  end
end
