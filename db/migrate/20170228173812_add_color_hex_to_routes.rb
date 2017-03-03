class AddColorHexToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :color_hex, :string
  end
end
