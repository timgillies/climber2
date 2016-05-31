class Route < ActiveRecord::Base
  belongs_to :facility
  belongs_to :zone
  belongs_to :wall
  belongs_to :user
  belongs_to :grade
  has_many :grades

  validates :color, presence: true
  validates :setter, presence: true
  validates :setdate, presence: true

end
