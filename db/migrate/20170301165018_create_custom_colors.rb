class CreateCustomColors < ActiveRecord::Migration
  def change
    create_table :custom_colors do |t|

      t.string :color_hex
      t.string :color_name
      t.string :text_color_hex
      t.references :user, foreign_key: {on_delete: :nullify}
      t.references :facility, foreign_key: {on_delete: :nullify}
      t.timestamps null: false
    end
  end
end
