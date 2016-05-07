class Facility < ActiveRecord::Base
  belongs_to :user
  default_scope -> { order(created_at: :desc) }
  validates :name, presence: true
  validates :addressline1, presence: true
  validates :city, presence: true
  validates :state, presence: true
  VALID_ZIPCODE_REGEX = /\A\d{5}-\d{4}|\A\d{5}\z/
  validates :zipcode, presence: true, format: { with: VALID_ZIPCODE_REGEX }

  validates :user_id, presence: true

end
