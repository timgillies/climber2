module FacilityTargetsHelper

  def facility_systems
    GradeSystem.joins(:facilities).where(:facilities => {:id => @facility.id})
  end

# Joins grades to facilities via grade_system and facility_grade_system relationships
  def facility_grades
    Grade.joins(:facilities).where(:facilities => {:id => @facility.id} )
  end

  def facility_systems_route_count
    facility_grades.joins(:routes).where(:routes => {:grade_id => facility_grades.id} ).size
  end

end
