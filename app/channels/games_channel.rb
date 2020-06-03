# frozen_string_literal: true

class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "games_#{params[:user_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
