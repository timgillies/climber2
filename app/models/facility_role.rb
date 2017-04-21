class FacilityRole < ActiveRecord::Base
  has_many :users
  has_many :facilities
  belongs_to :facility
  belongs_to :user

  before_save :downcase_email

  validates :email, presence: true, uniqueness: {scope: [:facility_id]}

  default_scope -> { order("
    CASE
      WHEN facility_roles.name = 'facility_management' THEN '1'
      WHEN facility_roles.name = 'head_setter' THEN '2'
      WHEN facility_roles.name = 'setter' THEN '3'
      WHEN facility_roles.name = 'marketing' THEN '4'
      WHEN facility_roles.name = 'guest' THEN '5'
    END")}

    scope :admin, -> {
    where.not(:name => 'climber')
    }


private

  def self.unconfirmed
    where("confirmed IS NULL OR confirmed = ?", false )
  end


  def downcase_email
    self.email = email.downcase if self.email
  end




end
