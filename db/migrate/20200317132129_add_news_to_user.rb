class AddNewsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :news, :boolean, default: true
  end
end
