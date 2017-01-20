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

  def task_days_ago(f)
    from_time = Date.current.in_time_zone.to_datetime
    to_time = f.setdate.to_datetime
    distance_of_time_in_words(to_time, from_time, scope: 'datetime.distance_in_words.short')
  end

  def task_filter_results_count
    @filterrific.to_hash.except!('task_with_status_id','task_sorted_by').count.to_i
  end


end
