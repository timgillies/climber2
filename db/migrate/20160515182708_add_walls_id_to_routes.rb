class AddWallsIdToRoutes < ActiveRecord::Migration
  def change
    add_reference :routes, :wall, index: true, foreign_key: true
  end
end
