class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.datetime :start_time
      t.integer :min_players_count
      t.integer :status
      t.datetime :finish_time

      t.timestamps
    end
  end
end
