class AddVerticalFt < ActiveRecord::Migration
  def change
    add_column :walls, :vertical_ft, :integer
  end
end
