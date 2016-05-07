class AddUserRefToFacilities < ActiveRecord::Migration
  def change
    add_index :facilities, [:user_id, :created_at]
  end
end
