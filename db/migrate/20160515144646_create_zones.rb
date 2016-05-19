class CreateZones < ActiveRecord::Migration
  def change
    add_reference :routes, :zone, index: true, foreign_key: true
  end
end
