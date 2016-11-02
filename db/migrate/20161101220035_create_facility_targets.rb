class CreateFacilityTargets < ActiveRecord::Migration
  def change
    create_table :facility_targets do |t|

      t.references :facility, index: true, foreign_key: true
      t.references :user, foreign_key: true
      t.references :grade, index: true, foreign_key: true
      t.references :zone, index: true, foreign_key: true
      t.references :wall, index: true, foreign_key: true
      t.references :sub_child_zone, index: true, foreign_key: true
      t.integer    :value


      t.timestamps null: false
    end
  end
end
