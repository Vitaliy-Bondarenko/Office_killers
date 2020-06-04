# frozen_string_literal: true

class ModelMailer < ApplicationMailer
  def game_started(user)
    @user = user
    mail to: user.email, subject: 'Your game has started!'
  end

  def game_finished(user)
    @user = user
    mail to: user.email, subject: 'The game has finished!'
  end

  def new_target(user)
    @user = user
    mail to: user.email, subject: 'You have a new target!'
  end
end
