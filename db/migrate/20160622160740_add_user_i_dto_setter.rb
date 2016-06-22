class AddUserIDtoSetter < ActiveRecord::Migration
  def change
    add_reference :setters, :user, index: true, foreign_key: {on_delete: :nullify}
  end
end
