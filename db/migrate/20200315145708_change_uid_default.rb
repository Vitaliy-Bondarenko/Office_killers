class ChangeUidDefault < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :uid, null: false
  end
end
