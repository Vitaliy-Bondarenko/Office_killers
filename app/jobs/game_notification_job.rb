# frozen_string_literal: true

class GameNotificationJob < ApplicationJob
  queue_as :default
  require 'fcm'

  def perform(user_id)
    @user = User.find_by(id: user_id)
    server_key = Rails.application.credentials.firebase[:secret_key]
    device_token = @user.notif_token
    fcm_client = FCM.new(server_key)
    options = {
      priority: 'high',
      notification: {
        title: game_cases.split('.')[0],
        body: game_cases.split('.')[1],
        sound: 'default',
        icon: '256.png',
        click_action: 'https://office-killer.herokuapp.com/game'
      },
    }
    fcm_client.send(device_token, options)
  end

  def game_cases
    case @user.current_game.status
    when 'in_progress'
      'Game has started. Your game has started! Go check your target!'
    when 'finished'
      'Game has finished. Your game has finished! Go check player statistic'
    end
  end
end
