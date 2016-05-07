class AddUserIdToFacilities < ActiveRecord::Migration
  def change
    add_reference :facilities, :user, index: true, foreign_key: true
  end
end
