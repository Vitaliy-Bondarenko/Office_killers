# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  attributes :id,
             :first_name,
             :last_name,
             :notify_game_start,
             :notify_game_finish,
             :news
end

