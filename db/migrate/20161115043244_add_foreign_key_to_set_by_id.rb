class AddForeignKeyToSetById < ActiveRecord::Migration
  def change
    add_foreign_key :routes, :users, column: :set_by_id
  end
end
