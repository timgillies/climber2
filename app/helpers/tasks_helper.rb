module TasksHelper

  def task_type_values
      [
        ['New Route', 'route_task' ],
        ['Maintenance', 'non_route_task']
      ]
  end

  def task_status_values
      [
        ['Active', 'active' ],
        ['Completed', 'completed']
      ]
  end

  def days_ago(f)
    from_time = Date.yesterday.in_time_zone.to_datetime
    to_time = f.setdate.to_datetime
    distance_of_time_in_words(to_time, from_time, scope: 'datetime.distance_in_words.short')
  end

end
