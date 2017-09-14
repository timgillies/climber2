class RemoveIndexFromInvites < ActiveRecord::Migration
  def change
    remove_index :comp_invites, [:inviter_id, :invitee_id]
  end
end
