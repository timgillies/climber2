class AddImageToZone < ActiveRecord::Migration

  def up
    add_attachment :zones, :image
  end

  def down
    remove_attachment :zones, :image
  end
end
