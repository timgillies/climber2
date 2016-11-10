class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.string :email
      t.string :card_token
      t.references :user, index: true, foreign_key: {on_delete: :nullify}
      t.references :plan, index: false, foreign_key: {on_delete: :nullify}
      t.timestamps null: false
    end
  end
end
