class RemoveFloatFromHoldCount < ActiveRecord::Migration
  def change
    remove_column :routes, :total_holds
    remove_column :routes, :foot_holds
  end
end
