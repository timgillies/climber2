module FacilityTargetsHelper

  def facility_systems
    GradeSystem.joins(:facilities).where(:facilities => {:id => @facility.id})
  end

# Joins grades to facilities via grade_system and facility_grade_system relationships
  def facility_grades
    Grade.joins(:facilities).where(:facilities => {:id => @facility.id} )
  end
  
end
