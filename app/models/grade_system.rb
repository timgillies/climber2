class GradeSystem < ApplicationRecord

  belongs_to :facility
  belongs_to :user
  has_many :grades
  has_many :facilities, :through => :facility_grade_systems
  belongs_to :facility_grade_system, :primary_key => :grade_system_id, :foreign_key => :id
  has_many :facility_grade_systems
  has_many :routes, :through => :grades
  has_many :ticks, :through => :grades


  validates :discipline, presence: true
  validates :category, presence: true
  validates :name, presence: true
  validates :name, uniqueness: {  scope: [:facility_id, :discipline] }



end
