module GradesHelper



  def systems
    [
      ['Custom', 'custom']
    ]
  end

  def available_systems
    GradeSystem.where("category = ? or facility_id = ?", 'outdoor', @facility.id)
  end

  def custom_systems
    GradeSystem.where("facility_id = ?", @facility.id)
  end

  def facility_systems
    GradeSystem.joins(:facilities).where(:facilities => {:id => @facility.id})
  end

  def facility_system_route_count(fs)
    Route.current.where(grade_id: Grade.where(grade_system_id: fs.id), facility_id: @facility.id).size
  end


# Joins grades to facilities via grade_system and facility_grade_system relationships
  def facility_grades
    Grade.joins(:facilities).where(:facilities => {:id => @facility.id})
  end



  def self.boulder
    Route.grade_systems.where("discipline = ?", 'boulder')
  end

  def self.sport
    Route.joins(:grade_system).where("grade_systems.discipline =?", 'sport')
  end

  def tester_method
    :grade_id
  end


end
