class AddIntegerHoldCounts < ActiveRecord::Migration
  def change
    add_column :routes, :total_holds, :integer
    add_column :routes, :foot_holds, :integer
  end
end
