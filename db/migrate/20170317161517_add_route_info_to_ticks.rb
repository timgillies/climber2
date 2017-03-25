class AddRouteInfoToTicks < ActiveRecord::Migration
  def change
    add_column :ticks, :name, :string
    add_column :ticks, :color_hex, :string
    add_reference :ticks, :grade, foreign_key: {on_delete: :nullify}
    add_attachment :ticks, :image
  end
end
