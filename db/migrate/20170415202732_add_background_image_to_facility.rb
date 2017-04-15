class AddBackgroundImageToFacility < ActiveRecord::Migration
  def change
    add_attachment :facilities, :header_image
  end
end
