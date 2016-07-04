class ChangeTypeColumnName < ActiveRecord::Migration
  def change
    rename_column :ticks, :type, :tick_type
  end
end
