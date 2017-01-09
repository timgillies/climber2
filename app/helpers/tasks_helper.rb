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

end
