class CreateFacilityRoles < ActiveRecord::Migration
  def change
    create_table :facility_roles do |t|

      t.string :name

      t.references :facility, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
