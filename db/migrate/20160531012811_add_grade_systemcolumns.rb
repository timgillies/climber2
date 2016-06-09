class AddGradeSystemcolumns < ActiveRecord::Migration
  def change
    add_column :facilities, :vscale, :boolean
    add_column :facilities, :yds, :boolean
    add_column :facilities, :custom, :boolean
  end
end
