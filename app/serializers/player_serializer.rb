# frozen_string_literal: true

class PlayerSerializer < ApplicationSerializer
  attributes :id,
             :game_id,
             :user_id,
             :status,
             :target_id,
             :target_ids,
             :user_email,
             :target_info,
             :dead_targets,
             :your_killers,
             :current_game_owner

  def target_info
    target_status = object.target.as_json(only: %i[status])
    object.target.user.as_json(only: %i[email image_URL]).merge(target_status) unless object.game.unstarted?
  end

  def dead_targets
    User.joins(:players).select(:id, :email, :status).where(players: { id: object.target_ids, status: :dead })
  end

  def your_killers
    Player.where('target_ids <@ ARRAY[?]', object.id).select(:email, :id).joins(:user)
  end

  def current_game_owner
    object.user_id == object.game.owner_id if object.game
  end
end
