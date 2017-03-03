FactoryGirl.define do
  factory :facility_role, :class => 'FacilityRole' do
    name 'facility_management'
    confirmed true
    user
    email 'test@gmail.com'
  end
end
