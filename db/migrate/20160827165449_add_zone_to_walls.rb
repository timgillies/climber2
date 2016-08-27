class AddZoneToWalls < ActiveRecord::Migration
  def change
    add_reference :walls, :zone, index: true, foreign_key: {on_delete: :nullify}
  end
end
