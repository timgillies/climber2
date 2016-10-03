class FacilityGradeSystem < ActiveRecord::Base

  belongs_to :facility, :foreign_key => :facility_id
  belongs_to :grade_system



  validates_uniqueness_of :facility_id, :scope => :grade_system_id


end
