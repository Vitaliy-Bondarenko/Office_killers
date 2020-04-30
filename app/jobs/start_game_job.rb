# frozen_string_literal: true

class StartGameJob
  include Sidekiq::Worker

  def perform(game)
    current_game = Game.find_by(id: game)
    return unless current_game.present? &&
                  current_game.start_time.between?(DateTime.now - 1.minute, DateTime.now + 1.minute)
    current_game.start_game
  end
end
