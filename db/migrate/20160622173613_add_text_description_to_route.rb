class AddTextDescriptionToRoute < ActiveRecord::Migration
  def change
    add_column :routes, :description, :text
  end
end
