class Grade < ActiveRecord::Base
  belongs_to :route
  belongs_to :facility
  belongs_to :user

  validates :discipline, presence: true
  validates :grade, presence: true
  validates :rank, numericality: { only_integer: true }
  validates :rank, uniqueness: {  scope: [:facility_id, :discipline] }
  validates :grade, uniqueness: {  scope: [:facility_id] }
end
