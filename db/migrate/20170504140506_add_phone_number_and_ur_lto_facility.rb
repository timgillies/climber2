class AddPhoneNumberAndUrLtoFacility < ActiveRecord::Migration
  def change
    add_column :facilities, :url, :string
    add_column :facilities, :phone_number, :string    
  end
end
