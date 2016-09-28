class AddTimeStamps2 < ActiveRecord::Migration
  def change
    change_table(:sub_child_zones) { |t| t.timestamps }
  end
end
