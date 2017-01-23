module RoutesHelper

  def facility_disciplines
    @facility = Facility.find(params[:facility_id])
    if @facility.custom?
      @facility.grades.all.map{|fg| [fg.discipline.capitalize, fg.discipline] }.uniq
    else
      [
        ['Boulder', 'boulder'],
        ['Sport', 'sport']
      ]
    end
  end

  def days_ago(f)
    from_time = Date.current.in_time_zone.to_datetime
    to_time = f.setdate.to_datetime
    distance_of_time_in_words(from_time, to_time, scope: 'datetime.distance_in_words.short')
  end

  def ric_values
      [
        ['Neutral', 0 ],
        ['1', 1 ],
        ['2', 2],
        ['3', 3],
        ['4', 4],
        ['5', 5],
      ]
  end

  def route_status_values
      [
        ['Route to be set', 'route_task' ],
        ['Other', 'non_route_task']
      ]
  end

def filter_results_count
  @filterrific.to_hash.except!('with_status_id','sorted_by').count.to_i
end

def facility_system_route_count(fs, fz)
  Route.current.where(grade_id: Grade.where(grade_system_id: fs.id), facility_id: @facility.id, zone_id: fz.id).count
end

def facility_system_target_count(fs, fz)
  FacilityTarget.where(grade_id: Grade.where(grade_system_id: fs.id), facility_id: @facility.id, zone_id: fz.id).count
end


end
