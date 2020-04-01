class AddOwnerIdToGames < ActiveRecord::Migration[6.0]
  def up
    add_column :games, :owner_id, :integer
    change_column :games, :code, :string
  end

  def down
    remove_column :games, :owner_id
    change_column :games, :code, :integer
  end
end
