class CreateGradeSystems < ActiveRecord::Migration
  def change
    create_table :grade_systems do |t|

      t.string :name
      t.string :discipline
      t.string :description
      t.references :facility, index: true, foreign_key: {on_delete: :nullify}
      t.references :user, foreign_key: {on_delete: :nullify}

      t.timestamps null: false
    end
  end
end
