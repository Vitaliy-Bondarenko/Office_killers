# frozen_string_literal: true

class GameSerializer < ApplicationSerializer
  attributes :start_time,
             :min_players_count,
             :status,
             :id,
             :finish_time,
             :owner_id,
             :code,
             :players,
             :banned_users

  def players
    object.players.joins(:user).select(:email, :first_name, :last_name, :id, :image_URL, :killed_targets, :target_ids)
  end
end
