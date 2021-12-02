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
             :current_game_owner,
             :avatar

  def avatar
    object.user.avatar.attachment.service_url
  end

  def target_info
    target_status = object.target.as_json(only: :status)
    serialize_user(object.target.user).merge(target_status) unless object.game.unstarted?
  end

  def dead_targets
    serialize_user(User.joins(:players).where(players: { id: object.killed_targets, status: :dead }))
  end

  def your_killers
    serialize_user(Player.where('? = ANY (target_ids)', object.id).map(&:user))
  end

  def current_game_owner
    object.user_id == object.game.owner_id if object.game
  end

  def player_full_name
    [object.user_first_name, object.user_last_name].join(' ')
  end

  private

  def serialize_user(user)
    ActiveModelSerializers::SerializableResource.new(user).as_json
  end
end
