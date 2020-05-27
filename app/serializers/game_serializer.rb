# frozen_string_literal: true

class GameSerializer < ApplicationSerializer
  attributes :start_time,
             :min_players_count,
             :status,
             :id,
             :finish_time,
             :owner_id,
             :code,
             :players

  def players
    object.players.joins(:user).select(:email, :first_name, :id, :image_URL, :target_ids)
  end
end
