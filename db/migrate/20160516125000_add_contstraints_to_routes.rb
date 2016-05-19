class AddContstraintsToRoutes < ActiveRecord::Migration
  def change
    remove_foreign_key :routes, :zones
    add_foreign_key :routes, :zones, on_delete: :nullify

    remove_foreign_key :routes, :walls
    add_foreign_key :routes, :walls, on_delete: :nullify
  end
end
