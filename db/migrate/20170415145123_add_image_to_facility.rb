class AddImageToFacility < ActiveRecord::Migration
  def change
    add_attachment :facilities, :logo_image
  end
end
