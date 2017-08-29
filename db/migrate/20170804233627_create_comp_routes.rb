class CreateCompRoutes < ActiveRecord::Migration
  def change
    create_table :comp_routes do |t|

      t.references :user, index: true, foreign_key: {on_delete: :nullify}
      t.references :routes, index: true
      t.references :competitions, index: true

      t.timestamps null: false
    end
  end
end
