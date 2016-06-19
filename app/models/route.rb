class Route < ActiveRecord::Base
  belongs_to :facility
  belongs_to :zone
  belongs_to :wall
  belongs_to :user
  belongs_to :grade
  has_many :grades

  validates :color, presence: true
  validates :setter, presence: true
  validates :setdate, presence: true

  filterrific(
  default_filter_params: { sorted_by: 'setdate_desc' },
  available_filters: [
    :sorted_by,
    :search_query,
    :with_grade_id,
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
  terms = query.downcase.split(/\s+/)

  # replace "*" with "%" for wildcard searches,
  # append '%', remove duplicate '%'s
  terms = terms.map { |e|
    (e.gsub('*', '%') + '%').gsub(/%+/, '%')
  }
  # configure number of OR conditions for provision
  # of interpolation arguments. Adjust this if you
  # change the number of OR conditions.
  num_or_conds = 2
  where(
    terms.map { |term|
      "(LOWER(routes.name) LIKE ? OR LOWER(routes.setter) LIKE ?)"
    }.join(' AND '),
    *terms.map { |e| [e] * num_or_conds }.flatten
  )
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
      where( grade_id: [*grade_ids])
  }

    # always include the lower boundary for semi open intervals
  scope :with_setdate_gte, lambda { |reference_time|
    where('routes.setdate >= ?', reference_time)
  }

  scope :with_enddate_lt, lambda { |reference_time|
    where('routes.enddate < ?', reference_time)
  }

  def self.options_for_sorted_by
    [
      ['Create date (newest first)', 'setdate_desc'],
      ['Expire date (newest first)', 'enddate_desc'],
    ]
  end

end
