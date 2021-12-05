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
    ActiveModelSerializers::SerializableResource.new(object.players).as_json
  end

  def banned_users
    ActiveModelSerializers::SerializableResource.new(User.where(id: object.banned_users)).as_json
  end
end
