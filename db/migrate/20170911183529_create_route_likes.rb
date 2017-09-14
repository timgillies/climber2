class CreateRouteLikes < ActiveRecord::Migration
  def change
    create_table :route_likes do |t|

      t.timestamps null: false
    end
  end
end
