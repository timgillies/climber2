
FactoryGirl.define do
  factory :facility, :class => 'Facility' do
    name 'Denver Bouldering Club'
    location 'Central'
    addressline1 '1558 Fairfax St.'
    city 'Denver'
    state 'CO'
    zipcode '80220'
    user_id '1'
    plan_id '1'
  end
end
