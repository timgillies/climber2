class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable,
         :omniauthable, :omniauth_providers => [:facebook]

  has_many :facility_relationships, :through => :facility_roles, source: :facility
  has_many :facilities
  has_many :routes
  has_many :grades
  has_many :zones
  has_many :walls
  has_many :setters
  has_many :ticks
  has_many :sub_child_zones
  has_many :grade_systems
  belongs_to :admin
  belongs_to :facility_role
  has_many :facility_roles

  attr_accessor :remember_token, :activation_token, :reset_token

  before_save   :downcase_email
  # before_create :create_activation_digest

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255},
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6}, allow_nil: true

  ratyrate_rater

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.image = auth.info.image
      user.name = auth.info.name
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.confirmed_at = DateTime.now.to_date
    end
end


  private

    # Converts email to all lower-case
    def downcase_email
      self.email = email.downcase
    end

    # Create and assigns the activation token and digest
    def create_activation_digest
      self.activation_token = User.new_token
      self.activation_digest = User.digest(activation_token)
    end
end
