class CreateFacilityGradeSystems < ActiveRecord::Migration
  def change
    create_table :facility_grade_systems do |t|

      t.references :facility, index: true, foreign_key: true
      t.references :grade_system, foreign_key: true

      t.timestamps null: false
    end
  end
end
