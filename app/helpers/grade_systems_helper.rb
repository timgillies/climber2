module GradeSystemsHelper

  def available_systems
    GradeSystem.where("category = ? or facility_id = ?", 'outdoor', @facility.id)
  end

  def system_grades
    Grade.where("grade_system_id = ?", @grade_system.id)
  end

  def categories
    [
      ['Existing Outdoor System', 'outdoor'],
      ['Custom System', 'custom']
    ]
  end

  def disciplines
    [
      ['Boulder', 'boulder'],
      ['Sport', 'sport']
    ]
  end

  def custom_systems
    GradeSystem.where("facility_id = ?", @facility.id)
  end

end
