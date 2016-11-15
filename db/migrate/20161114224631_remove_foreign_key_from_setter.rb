class RemoveForeignKeyFromSetter < ActiveRecord::Migration
  def change
    change_column(:routes, :setter_id, :integer, {index: true, foreign_key: false})
  end
end
