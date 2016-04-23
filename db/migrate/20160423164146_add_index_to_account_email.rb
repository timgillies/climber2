class AddIndexToAccountEmail < ActiveRecord::Migration
  def change
    add_index :accounts, :email, unique: true
  end
end
