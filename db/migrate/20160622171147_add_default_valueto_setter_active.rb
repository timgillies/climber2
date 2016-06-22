class AddDefaultValuetoSetterActive < ActiveRecord::Migration
  def change
    change_column :setters, :active, :boolean, :default => true
  end
end
