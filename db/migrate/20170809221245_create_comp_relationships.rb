class CreateCompRelationships < ActiveRecord::Migration
  def change
    create_table :comp_relationships do |t|
      t.references :user, index: true, foreign_key: {on_delete: :nullify}
      t.references :competition, index: true, foreign_key: {on_delete: :nullify}
      t.string :role_name

      t.timestamps null: false
    end
  end
end
