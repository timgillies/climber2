class AddImageToRoutes < ActiveRecord::Migration
  def up
    add_attachment :routes, :image
  end

  def down
    remove_attachment :routes, :image
  end
end
