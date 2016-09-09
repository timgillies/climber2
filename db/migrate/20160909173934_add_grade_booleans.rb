class AddGradeBooleans < ActiveRecord::Migration
  def change
    add_column :facilities, :vscale, :boolean
    add_column :facilities, :yds, :boolean
  end
end
