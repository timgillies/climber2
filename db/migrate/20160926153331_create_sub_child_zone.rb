class CreateSubChildZone < ActiveRecord::Migration
  def change
    create_table :sub_child_zones do |t|

      t.string :name
      t.references :wall, index: true, foreign_key: true
      t.references :facility, index: true, foreign_key: true
      t.references :user, foreign_key: true

    end
  end
end
