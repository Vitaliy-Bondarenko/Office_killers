# frozen_string_literal: true

class PlayerSerializer < ApplicationSerializer
  attributes :id,
             :game_id,
             :user_id,
             :status,
             :target_id,
             :target_ids,
             :target_info,
             :dead_targets,
             :your_killers,
             :player_full_name,
             :current_game_owner

  def target_info
    target_status = object.target.as_json(only: %i[status])
    object.target.user.as_json(only: %i[first_name last_name image_URL]).merge(target_status) unless object.game.unstarted?
  end

  def dead_targets
    User.joins(:players).select(:id, :first_name, :last_name, :status, :image_URL).where(players: { id: object.killed_targets, status: :dead })
  end

  def your_killers
    Player.where('? = ANY (target_ids)', object.id).select(:first_name, :last_name, :id, :image_URL).joins(:user)
  end

  def current_game_owner
    object.user_id == object.game.owner_id if object.game
  end

  def player_full_name
    [object.user_first_name, object.user_last_name].join(' ')
  end
end
