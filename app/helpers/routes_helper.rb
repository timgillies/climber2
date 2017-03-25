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

def color_options
  [
    ['Red','#EF5350'],
    ['Pink', '#FF33AA'],
    ['Purple','#7e57c2'],
    ['Blue','#2980b9'],
    ['Green','#16B085'],
    ['Lime','#CDDC39'],
    ['Yellow','#fdd835'],
    ['Orange','#FF9800'],
    ['Brown','#996655'],
    ['White', '#F9F9F8'],
    ['Gray','#999999'],
    ['Black','#626262'],
    ['Other','#e2e4e4'],
  ]
end

# Looks up color_options array by hex value and returns the name of the color
def color_name(hex,facility)
  (color_options + custom_color_options(facility)).detect { |color, value| value == hex }
end

def custom_color_options(facility)
  CustomColor.where(facility_id: facility).map{|color| [color.color_name, color.color_hex]}
end


def climber_facilities
  Facility.joins(:facility_roles).where(:facility_roles => {:user_id => current_user.id})
end

def route_grades
  Route.joins(:grades)
end


def previous_next
  if Grade.previous(@route).present? && Grade.next(@route).present?
    [
      [Grade.previous(@route).grade, Grade.previous(@route).id.to_i],
      [Grade.actual(@route).grade, Grade.actual(@route).id.to_i],
      [Grade.next(@route).grade, Grade.next(@route).id.to_i]
    ]
  elsif Grade.previous(@route).present?
    [
      [Grade.previous(@route).grade, Grade.previous(@route).id.to_i],
      [Grade.actual(@route).grade, Grade.actual(@route).id.to_i]
    ]
  elsif Grade.next(@route).present?
    [
      [Grade.actual(@route).grade, Grade.actual(@route).id.to_i],
      [Grade.next(@route).grade, Grade.next(@route).id.to_i]
    ]
  else
    [
      [Grade.actual(@route).grade, Grade.actual(@route).id.to_i]
    ]
  end
end

end
