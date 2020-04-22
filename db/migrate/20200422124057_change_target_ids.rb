class ChangeTargetIds < ActiveRecord::Migration[6.0]
  def up
    remove_column :players, :target_ids
    add_column :players, :target_ids, :integer, array: true, default: []
  end

  def down
    remove_column :players, :target_ids
    add_column :players, :target_ids, :integer
  end
end
