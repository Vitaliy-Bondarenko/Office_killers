class RefactorPlayerTable < ActiveRecord::Migration[6.0]
  def change
    remove_column :players, :user_id, :integer
    remove_column :players, :game_id, :integer
    add_reference :players, :game, foreign_key: true
    add_reference :players, :user, foreign_key: true
    add_column :players, :killed_targets, :integer, array: true, default: []
    add_column :games, :banned_users, :integer, array: true, default: []
  end
end
