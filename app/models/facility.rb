class Facility < ActiveRecord::Base
  validates :name, presence: true
  VALID_ZIPCODE_REGEX = /\A\d{5}-\d{4}|\A\d{5}\z/
  validates :zipcode, presence: true, format: { with: VALID_ZIPCODE_REGEX }
end
