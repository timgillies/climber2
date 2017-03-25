class AddColorToTicks < ActiveRecord::Migration
  def change
    add_column :ticks, :color, :string
  end
end
