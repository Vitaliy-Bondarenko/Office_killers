# frozen_string_literal: true

class Player < ApplicationRecord
  belongs_to :game
  belongs_to :user
  belongs_to :target, optional: true, class_name: 'Player'
  delegate :email, to: :user, prefix: true

  scope :all_except, ->(user) { where.not(user_id: user) }
  scope :alive_users, -> { where(status: :alive) }

  enum status: %i[alive dead death_confirm]

  scope :order_by_last, (-> { joins(:game).order('games.created_at desc') })
end
