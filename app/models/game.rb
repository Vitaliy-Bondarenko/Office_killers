# frozen_string_literal: true

class Game < ApplicationRecord
  has_many :players, dependent: :destroy

  enum status: %i[unstarted in_progress finished]

  validates :start_time, timeliness: { on_or_after: lambda { DateTime.now.iso8601 }, type: :date }
  validates :code, uniqueness: true, presence: true

  after_create :add_owner_player

  private

  def add_owner_player
    players.create(user_id: owner_id)
  end
end
