class CreateSetters < ActiveRecord::Migration
  def change
    create_table :setters do |t|

      t.string :first_name
      t.string :last_name
      t.string :nick_name
      t.string :email
      t.references :facility, index: true, foreign_key: {on_delete: :nullify}

      t.timestamps null: false
    end
  end
end
