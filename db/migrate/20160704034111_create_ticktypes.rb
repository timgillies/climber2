class CreateTicktypes < ActiveRecord::Migration
  def change
    create_table :ticktypes do |t|
      t.string :name
      t.integer :value
      t.timestamps null: false
    end
  end
end
