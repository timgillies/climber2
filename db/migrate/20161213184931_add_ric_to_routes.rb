class AddRicToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :risk, :integer
    add_column :routes, :intensity, :integer
    add_column :routes, :complexity, :integer
  end
end
