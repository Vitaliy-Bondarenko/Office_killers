# frozen_string_literal: true

class Game < ApplicationRecord
  has_many :players, dependent: :destroy
  has_many :users, through: :players

  enum status: %i[unstarted in_progress finished]

  validates :start_time, timeliness: { on_or_after: lambda { DateTime.now.iso8601 }, type: :date },
                         if: -> { start_time.present? }

  validates :code, uniqueness: true, presence: true
  after_create :add_owner_player, :start_game_on_time
  after_update :start_game_on_time, if: -> { saved_change_to_start_time? }

  after_create_commit :broadcast_game
  after_update_commit :broadcast_game
  after_update :changing_page_broadcast, if: -> { saved_change_to_status? }
  before_destroy :broadcast_game

  def start_game
    return unless unstarted? && players.count > 2

    sorted_players = players.shuffle
    sorted_players.each.with_index do |p, index|
      target = sorted_players[index + 1] || sorted_players[0]
      p.update(target_id: target.id, target_ids: [target.id], status: :alive)
    end
    game_status_notif
    in_progress!
  end

  def validate_entry(user_id)
    unstarted? && banned_users&.exclude?(user_id) && user_ids.exclude?(user_id)
  end

  def broadcast_game
    user_ids.each do |user_id|
      GameBroadcastJob.perform_later(user_id, 'players_changing')
    end
  end

  def changing_page_broadcast
    user_ids.each do |user_id|
      GameBroadcastJob.perform_later(user_id, 'page_changing')
    end
  end

  def broadcast_individual(user_id)
    GameBroadcastJob.perform_later(user_id)
  end

  def game_status_notif
    users.where(notify_game_start: true).find_each do |user|
      perform_notification(user.id)
    end
  end

  private

  def add_owner_player
    players.create(user_id: owner_id)
  end

  def start_game_on_time
    StartGameJob.perform_at(start_time, id) if unstarted? && start_time.present?
  end

  def perform_notification(user_id)
    GameNotificationJob.perform_later(user_id)
  end
end
