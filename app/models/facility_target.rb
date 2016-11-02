class FacilityTarget < ActiveRecord::Base
  belongs_to :facility
  belongs_to :grade
  belongs_to :zone
  belongs_to :wall
  belongs_to :sub_child_zone
  belongs_to :user
  has_many :grades

  validates :value, presence: true

end
