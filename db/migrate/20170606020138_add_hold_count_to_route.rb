class AddHoldCountToRoute < ActiveRecord::Migration
  def change

    add_column :routes, :total_holds, :float
    add_column :routes, :foot_holds, :float
    add_column :zones, :height, :float
    add_column :zones, :width, :float
    add_column :zones, :angle, :float
    add_column :walls, :height, :float
    add_column :walls, :width, :float
    add_column :walls, :angle, :float

  end
end
