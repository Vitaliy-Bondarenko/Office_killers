class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.integer :game_id
      t.integer :user_id
      t.integer :target_id
      t.integer :status
      t.integer :target_ids

      t.timestamps
    end
  end
end
