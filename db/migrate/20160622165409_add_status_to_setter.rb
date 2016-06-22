class AddStatusToSetter < ActiveRecord::Migration
  def change
    add_column :setters, :active, :boolean
  end
end
