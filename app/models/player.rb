# frozen_string_literal: true

class Player < ApplicationRecord
  belongs_to :game
  belongs_to :user
  has_one :user, dependent: :destroy
end
