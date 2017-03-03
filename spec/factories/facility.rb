
FactoryGirl.define do
  factory :facility, :class => 'Facility' do
    name 'Denver Bouldering Club'
    addressline1 '1558 Fairfax St.'
    city 'Denver'
    state 'CO'
    zipcode '80220'

    after(:build) { |facility| facility.class.skip_callback(:create, :after, :create_facility_role) }


  end
end
