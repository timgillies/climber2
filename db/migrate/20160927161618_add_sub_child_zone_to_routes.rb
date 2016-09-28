class AddSubChildZoneToRoutes < ActiveRecord::Migration
  def change
    add_reference :routes, :sub_child_zone, index: true, foreign_key: {on_delete: :nullify}
  end
end
