class AddGradeRanks < ActiveRecord::Migration
  def change
    add_column :grades, :range_start, :decimal
    add_column :grades, :range_end, :decimal
    change_column :grades, :rank, :decimal
  end
end
