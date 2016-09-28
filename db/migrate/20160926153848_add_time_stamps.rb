class AddTimeStamps < ActiveRecord::Migration
  def change_table
      add_column(:sub_child_zones, :created_at, :datetime)
      add_column(:sub_child_zones, :updated_at, :datetime)
    end
end
