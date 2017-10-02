class Wall < ApplicationRecord
  belongs_to  :facility
  belongs_to  :user
  belongs_to  :zone
  has_many    :routes
  has_many    :sub_child_zones
  has_many :facility_targets
  has_many    :tasks

  validates :name, presence: true, uniqueness: {scope: [:facility_id, :zone_id] }, length: { maximum: 50}
  validates :zone_id, presence: true


  default_scope -> { order(created_at: :asc) }

end
