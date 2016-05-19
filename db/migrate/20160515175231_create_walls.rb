class CreateWalls < ActiveRecord::Migration
  def change
    create_table :walls do |t|
      t.string :name
      t.references :facility, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
