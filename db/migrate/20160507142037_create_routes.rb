class CreateRoutes < ActiveRecord::Migration
  def change
    create_table :routes do |t|
      t.references :user, index: true, foreign_key: true
      t.references :facility, index: true, foreign_key: true
      t.string :name
      t.string :color
      t.string :setter
      t.date :setdate
      t.date :enddate

      t.timestamps null: false
    end
    add_index :routes, [:user_id, :facility_id, :created_at]
  end
end
