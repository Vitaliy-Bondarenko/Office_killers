# frozen_string_literal: true

class PlayerNotificationJob < ApplicationJob
  queue_as :default
  require 'fcm'

  def perform(player_id)
    @user = User.find(Player.find(player_id).user_id)
    server_key = Rails.application.creadentials.firebase[:secret_key]
    @target = Player.find(@user.current_player.target_ids[0])
    user_target = User.find(@target.user_id)
    device_token = @target.status == 'dead' ? user_target.notif_token : @user.notif_token
    fcm_client = FCM.new(server_key)
    options = {
      priority: 'high',
      notification: {
        title: player_cases.split('.')[0],
        body: player_cases.split('.')[1],
        sound: 'default'
      }
    }
    fcm_client.send(device_token, options)
  end

  def player_cases
    case @target.status
    when 'death_confirm'
      'Confirm your kill. Did you kill your target?'
    when 'dead'
      'You are dead. Wait for game to end to see results'
    end
  end
end
