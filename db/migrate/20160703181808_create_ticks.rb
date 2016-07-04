class CreateTicks < ActiveRecord::Migration
  def change
    create_table :ticks do |t|
      t.references :user, index: true, foreign_key: true
      t.references :route, index: true, foreign_key: {on_delete: :nullify}
      t.string :type
      t.string :description
      t.date :date
      t.timestamps null: false
    end
  end
end
