class FacilityRole < ActiveRecord::Base
  has_many :users
  has_many :facilities
  belongs_to :facility
  belongs_to :user

  before_save :downcase_email

  validates :email, uniqueness: {scope: [:facility_id]}
  validates :user_id, uniqueness: {scope: [:facility_id]}


private

  def self.unconfirmed
    where("confirmed IS NULL OR confirmed = ?", false )
  end


  def downcase_email
    self.email = email.downcase if self.email
  end




end
