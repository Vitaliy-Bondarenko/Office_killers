# frozen_string_literal: true

class Game < ApplicationRecord
  has_many :players, dependent: :destroy

  enum status: %i[unstarted in_progress finished]
end
