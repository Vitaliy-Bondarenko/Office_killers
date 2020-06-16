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
  before_destroy :broadcast_game

  def start_game
    return unless unstarted? && players.count > 2
    sorted_players = players.shuffle
    sorted_players.each.with_index do |p, index|
      target = sorted_players[index + 1] || sorted_players[0]
      p.update(target_id: target.id, target_ids: [target.id], status: :alive)
    end
    start_game_message
    in_progress!
    ActionCable.server.broadcast('notification_channel', 'Your game has started!')
  end

  def broadcast_game
    user_ids.each do |user_id|
      GameBroadcastJob.perform_later(user_id)
    end
  end

  private

  def start_game_message
    users.where(notify_game_start: true).find_each do |user|
      ModelMailer.game_started(user).deliver_later
    end
  end

  def add_owner_player
    players.create(user_id: owner_id)
  end

  def start_game_on_time
    StartGameJob.perform_at(start_time, id) if unstarted? && start_time.present?
  end
end
