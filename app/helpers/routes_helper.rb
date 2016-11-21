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
    from_time = Date.today
    to_time = f.setdate.to_datetime
    distance_of_time_in_words(from_time, to_time, scope: 'datetime.distance_in_words.short')
  end


end
