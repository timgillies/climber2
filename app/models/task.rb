class Task < ActiveRecord::Base

  belongs_to :facility
  belongs_to :zone
  belongs_to :wall
  belongs_to :sub_child_zone
  belongs_to :user
  belongs_to :grade
  belongs_to :assignee, :class_name => 'User'
  belongs_to :assigner, :class_name => 'User'
  belongs_to :completed_by, :class_name => 'User'
  has_many :routes
  has_many :ticks
  has_many :grades
  belongs_to :tick

  filterrific(
  default_filter_params: { task_sorted_by: 'created_at_desc', task_with_status_id: 'active' },
  available_filters: [
    :task_sorted_by,
    :task_with_zone_id,
    :task_with_setter_id,
    :task_with_status_id,
  ]
  )

  # define ActiveRecord scopes for
  # :search_query, :sorted_by, :with_country_id, and :with_created_at_gte

  scope :task_search_query, lambda { |query|
  # Searches the students table on the 'first_name' and 'last_name' columns.
  # Matches using LIKE, automatically appends '%' to each term.
  # LIKE is case INsensitive with MySQL, however it is case
  # sensitive with PostGreSQL. To make it work in both worlds,
  # we downcase everything.
  return nil  if query.blank?

  # condition query, parse into individual keywords
  terms = query

  # replace "*" with "%" for wildcard searches,
  # append '%', remove duplicate '%'s

  # configure number of OR conditions for provision
  # of interpolation arguments. Adjust this if you
  # change the number of OR conditions.
  num_or_conds = 1
  where("tasks.id = ?", terms)
}

scope :task_sorted_by, lambda { |sort_option|
  # extract the sort direction from the param value.
  direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
  case sort_option.to_s
  when /^setdate_/
    # Simple sort on the created_at column.
    # Make sure to include the table name to avoid ambiguous column names.
    # Joining on other tables is quite common in Filterrific, and almost
    # every ActiveRecord table has a 'created_at' column.
    order("tasks.setdate #{ direction }")
  when /^created_at_/
    # Simple sort on the created_at column.
    # Make sure to include the table name to avoid ambiguous column names.
    # Joining on other tables is quite common in Filterrific, and almost
    # every ActiveRecord table has a 'created_at' column.
    order("tasks.created_at #{ direction }")
  else
    raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
  end
}

  scope :task_with_grade_id, lambda { |grade_ids|
      where( 'grade_id = ?', grade_ids)
  }

  scope :task_with_zone_id, lambda { |zone_ids|
      where( 'zone_id = ?', zone_ids)
  }

  scope :task_with_wall_id, lambda { |wall_ids|
      where( 'wall_id = ?', wall_ids)
  }

  scope :task_with_setter_id, lambda { |setter_ids|
      where( 'assignee_id = ?', setter_ids)
  }

  scope :task_with_status_id, lambda { |status_ids|
      where( 'status = ?', status_ids)
  }

    # always include the lower boundary for semi open intervals
  scope :task_with_setdate_gte, lambda { |reference_time|
    where('tasks.setdate >= ?', reference_time)
  }

  scope :task_with_setdate_lt, lambda { |reference_time|
    where('tasks.setdate <= ?', reference_time)
  }

  def self.options_for_sorted_by
    [
      ['Newest first (created date)', 'created_at_desc'],
      ['Oldest first (created date)', 'created_at_asc'],
      ['Newest first (set date)', 'setdate_desc'],
      ['Oldest first (set date)', 'setdate_asc'],

    ]
  end

  def self.options_for_status_select
    [
      ['Active', 'active' ],
      ['Completed', 'completed']
    ]
  end

  def self.total_on(date)
    where("date(setdate) = ?", date)
  end


  def active?
    (self.status == "active")
  end

  def completed?
    (self.status == "completed")
  end


end
