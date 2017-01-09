class SubChildZone < ActiveRecord::Base

  belongs_to :facility
  belongs_to :user
  belongs_to :wall
  has_many :routes
  has_many    :tasks

  validates :name, presence: true, uniqueness: {scope: [:facility_id, :wall_id] }, length: { maximum: 50}
  validates :wall_id, presence: true

end
