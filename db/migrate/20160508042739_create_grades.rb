class CreateGrades < ActiveRecord::Migration
  def change
    create_table :grades do |t|
      t.string :grade
      t.string :system
      t.string :style
      t.integer :rank

      t.timestamps null: false
    end
  end
end
