class ChangeDefaultNotif < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :notify_game_start, :boolean, default: true
    change_column :users, :notify_game_finish, :boolean, default: true
  end
end
