# frozen_string_literal: true

class Game < ApplicationRecord
  has_many :players, dependent: :destroy

  enum status: %i[unstarted in_progress finished]

  validates :start_time, timeliness: { on_or_after: lambda { DateTime.now.iso8601 }, type: :date },
                         if: -> { start_time.present? }

  validates :code, uniqueness: true, presence: true
  after_create :add_owner_player, :start_game_on_time
  after_update :start_game_on_time, if: -> { saved_change_to_start_time? }

  def start_game
    return unless unstarted? && players.count > 2
    sorted_players = players.shuffle
    sorted_players.each.with_index do |p, index|
      target = sorted_players[index + 1] || sorted_players[0]
      p.update(target_id: target.id, target_ids: [target.id], status: :alive)
    end
    in_progress!
  end

  private

  def add_owner_player
    players.create(user_id: owner_id)
  end

  def start_game_on_time
    StartGameJob.perform_at(start_time, id) unless in_progress? && finished? && start_time.nil?
  end
end
