class AddCompTable < ActiveRecord::Migration
  def change
    create_table :competitions do |t|
      t.references :user, index: true, foreign_key: {on_delete: :nullify}
      t.references :facility, index: true, foreign_key: {on_delete: :nullify}
      t.string :name
      t.string :description
      t.datetime :start_date
      t.datetime :end_date
      t.boolean :private
      t.string :password
      t.string :password_confirmation
      t.attachment :logo_image
      t.timestamps null: false
    end
  end
end
