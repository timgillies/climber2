class FacilityRole < ActiveRecord::Base
  has_many :users
  has_many :facilities
  belongs_to :facility
  belongs_to :user

  before_save :downcase_email

  validates :email, presence: true, uniqueness: {scope: [:facility_id]}

  default_scope -> { order("
    CASE
      WHEN name = 'facility_management' THEN '1'
      WHEN name = 'headsetter' THEN '2'
      WHEN name = 'setter' THEN '3'
      WHEN name = 'marketing' THEN '5'
      WHEN name = 'guest' THEN '4'
    END")}


private

  def self.unconfirmed
    where("confirmed IS NULL OR confirmed = ?", false )
  end


  def downcase_email
    self.email = email.downcase if self.email
  end




end
