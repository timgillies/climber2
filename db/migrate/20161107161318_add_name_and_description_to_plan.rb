class AddNameAndDescriptionToPlan < ActiveRecord::Migration
  def change

    add_column :plans, :name, :string
    add_column :plans, :description, :string
  end
end
