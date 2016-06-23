class AddUserIdToWalls < ActiveRecord::Migration
  def change
    add_reference :walls, :user, index: true, foreign_key: true
    add_reference :routes, :zone, index: true, foreign_key: true
  end
end
