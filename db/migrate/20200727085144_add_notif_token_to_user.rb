class AddNotifTokenToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :notif_token, :string
  end
end
