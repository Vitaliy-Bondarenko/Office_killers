# frozen_string_literal: true

class Game < ApplicationRecord
  has_many :players, dependent: :destroy

  enum status: %i[unstarted in_progress finished]

  after_create :add_owner_player

  private

  def add_owner_player
    players.create(user_id: owner_id)
  end
end
