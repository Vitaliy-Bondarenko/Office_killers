class AddCodeToGame < ActiveRecord::Migration[6.0]
  def change
    add_column :games, :code, :integer
  end
end
