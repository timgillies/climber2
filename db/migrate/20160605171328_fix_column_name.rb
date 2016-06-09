class FixColumnName < ActiveRecord::Migration
  def change
    change_table :facilities do |t|
       t.remove :yds
       t.remove :vscale
     end
  end
end
