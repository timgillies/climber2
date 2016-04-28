class RenameAccountsTableToUsers < ActiveRecord::Migration
  def change
    rename_table :accounts, :users
  end
end
