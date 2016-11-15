class Route < ActiveRecord::Base
  belongs_to :facility
  belongs_to :zone
  belongs_to :wall
  belongs_to :sub_child_zone
  belongs_to :user, :class_name => "User", :foreign_key => "user_id", :primary_key => "id"
  belongs_to :grade
  belongs_to :set_by_id, :class_name => "User", :foreign_key => "user_id", :primary_key => "id"
  has_many :ticks
  has_many :grades
  belongs_to :tick


  accepts_nested_attributes_for :ticks


  validates :color, presence: true
  validates :user_id, presence: true
  validates :setdate, presence: true
  validates :grade, presence: true

  default_scope -> { order(created_at: :desc) }



# checks if route is active or expired.  true = active
  def active?
    (Date.today - self.enddate).to_i <= 0
  end

  def self.current
    where("enddate > ?", Date.today)
  end

# counts number of routes set on given date
  def self.set_on(date)
    where("date(setdate) = ?", date).count(:id)
  end

# limits routes where the grade is a "boulder" grade
  def self.boulder
    Route.joins(:grade).merge(Grade.where(:discipline => 'boulder'))
  end

# limits routes where the grade is a "sport" grade
  def self.sport
    Route.joins(:grade).merge(Grade.where(:discipline => 'sport'))
  end

# enables rating for routes
  ratyrate_rateable 'total'

  filterrific(
  default_filter_params: { sorted_by: 'setdate_desc', with_status_id: Date.today },
  available_filters: [
    :sorted_by,
    :search_query,
    :with_grade_id,
    :with_zone_id,
    :with_wall_id,
    :with_setter_id,
    :with_status_id,
    :with_setdate_gte
  ]
  )
  # define ActiveRecord scopes for
  # :search_query, :sorted_by, :with_country_id, and :with_created_at_gte

  scope :search_query, lambda { |query|
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
  where("routes.id = ?", terms)
}

scope :sorted_by, lambda { |sort_option|
  # extract the sort direction from the param value.
  direction = (sort_option =~ /desc$/) ? 'desc' : 'asc'
  case sort_option.to_s
  when /^setdate_/
    # Simple sort on the created_at column.
    # Make sure to include the table name to avoid ambiguous column names.
    # Joining on other tables is quite common in Filterrific, and almost
    # every ActiveRecord table has a 'created_at' column.
    order("routes.setdate #{ direction }")
  when /^enddate_/
    # Simple sort on the created_at column.
    # Make sure to include the table name to avoid ambiguous column names.
    # Joining on other tables is quite common in Filterrific, and almost
    # every ActiveRecord table has a 'created_at' column.
    order("routes.enddate #{ direction }")
  else
    raise(ArgumentError, "Invalid sort option: #{ sort_option.inspect }")
  end
}

  scope :with_grade_id, lambda { |grade_ids|
      where( 'grade_id = ?', grade_ids)
  }

  scope :with_zone_id, lambda { |zone_ids|
      where( 'zone_id = ?', zone_ids)
  }

  scope :with_wall_id, lambda { |wall_ids|
      where( 'wall_id = ?', wall_ids)
  }

  scope :with_setter_id, lambda { |setter_ids|
      where( 'user_id = ?', setter_ids)
  }

  scope :with_status_id, lambda { |status_ids|
      where( 'routes.enddate > ?', status_ids)
  }

    # always include the lower boundary for semi open intervals
  scope :with_setdate_gte, lambda { |reference_time|
    where('routes.setdate >= ?', reference_time)
  }

  scope :with_enddate_lt, lambda { |reference_time|
    where('routes.active = ?', reference_time)
  }

  def self.options_for_sorted_by
    [
      ['Newest first', 'setdate_desc'],
      ['Oldest first', 'setdate_asc'],
    ]
  end

  def self.options_for_status_select
    [
      ['Active', Date.today ]
    ]
  end

  def self.total_on(date)
    where("date(setdate) = ?", date)
  end
end
