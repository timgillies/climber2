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
  default_filter_params: { sorted_by: 'created_at_desc' },
  available_filters: [
    :sorted_by,
    :search_query,
    :with_country_id,
    :with_created_at_gte
  ]
)
# define ActiveRecord scopes for
# :search_query, :sorted_by, :with_country_id, and :with_created_at_gte

end
