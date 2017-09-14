class AddFieldsToRouteLikeTable < ActiveRecord::Migration
  def change
      add_reference :route_likes, :user, foreign_key: {on_delete: :nullify}
      add_reference :route_likes, :route, foreign_key: {on_delete: :nullify}
      add_column :route_likes, :like, :boolean
      add_column :route_likes, :comment, :string
  end
end
