class AddDisciplineToRoutes < ActiveRecord::Migration
  def change
    add_column :routes, :discipline, :string
  end
end
