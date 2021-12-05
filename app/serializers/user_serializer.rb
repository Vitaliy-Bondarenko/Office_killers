# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  attributes :id,
             :first_name,
             :last_name,
             :full_name,
             :notify_game_start,
             :notify_game_finish,
             :news,
             :avatar

  def avatar
    object.avatar.attachment.service_url
  end

  def full_name
    [object.first_name, object.last_name].join(' ')
  end
end

