# frozen_string_literal: true

class PlayerSerializer < ApplicationSerializer
  attributes :id,
             :game_id,
             :user_id,
             :status,
             :target_id,
             :target_ids,
             :user_email,
             :target_info

  def target_info
    target_status = object.target.as_json(only: %i[status])
    object.target.user.as_json(only: %i[email image_URL]).merge(target_status) unless object.game.unstarted?
  end
end
