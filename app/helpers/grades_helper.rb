module GradesHelper

  def disciplines
    [
      ['Boulder', 'boulder'],
      ['Sport', 'sport']
    ]
  end

  def systems
    [
      ['Custom', 'custom']
    ]
  end

  def facility_grades


    if @facility.yds? && @facility.vscale?
        Grade.where("system = ? or system = ? or facility_id = ?", 'yds', 'vscale', @facility.id).all
    elsif @facility.yds?
        Grade.where("system = ? or facility_id = ?", 'yds', @facility.id).all
    elsif @facility.vscale?
        Grade.where("system = ? or facility_id = ?", 'vscale', @facility.id).all
    else
        @facility.grades.all if @facility.grades
    end
  end

end
