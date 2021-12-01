class RemoveImageUrl < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :image_URL, :string
  end
end
