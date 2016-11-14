class FacilityTarget < ActiveRecord::Base
  belongs_to :facility
  belongs_to :grade
  belongs_to :zone
  belongs_to :wall
  belongs_to :sub_child_zone
  belongs_to :user
  has_many :grades

  validates :value, presence: true
  validates :zone_id, uniqueness: {scope: [:grade_id, :wall_id, :sub_child_zone_id]}
  validates :wall_id, uniqueness: {scope: [:zone_id, :sub_child_zone_id, :grade_id]}
  validates :sub_child_zone_id, uniqueness: {scope: [:zone_id, :wall_id, :grade_id]}
  validates :grade_id, presence: true, uniqueness: {scope: [:zone_id, :wall_id, :sub_child_zone_id]}

end
