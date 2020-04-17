# frozen_string_literal: true

class Player < ApplicationRecord
  belongs_to :game
  belongs_to :user
  delegate :email, to: :user, prefix: true

  scope :order_by_last, (-> { joins(:game).where.not(games: { status: :finished }).order('games.created_at desc') })
end
