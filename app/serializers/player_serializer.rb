# frozen_string_literal: true

class PlayerSerializer < ApplicationSerializer
  attributes :id,
             :game_id,
             :user_id,
             :target_id,
             :status,
             :target_ids,
             :user_email
end
