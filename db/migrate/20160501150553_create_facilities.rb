class CreateFacilities < ActiveRecord::Migration
  def change
    create_table :facilities do |t|
      t.string :name
      t.string :location
      t.string :addressline1
      t.string :addressline2
      t.string :city
      t.string :state
      t.string :zipcode

      t.timestamps null: false
    end
  end
end
