class CreateCompInvites < ActiveRecord::Migration
  def change
    create_table :comp_invites do |t|
      t.integer :inviter_id
      t.integer :invitee_id
      t.timestamps null: false
    end
    add_reference :comp_invites, :competition, foreign_key: {on_delete: :nullify}
    add_index :comp_invites, :inviter_id
    add_index :comp_invites, :invitee_id
    add_index :comp_invites, [:inviter_id, :invitee_id], unique: true
  end
end
