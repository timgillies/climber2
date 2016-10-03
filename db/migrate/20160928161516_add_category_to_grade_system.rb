class AddCategoryToGradeSystem < ActiveRecord::Migration
  def change
    add_column :grade_systems, :category, :string
  end
end
