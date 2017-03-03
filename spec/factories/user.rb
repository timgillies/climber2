FactoryGirl.define do
  sequence :email do |n|
    "person#{n}@example.com"
  end
end

FactoryGirl.define do
  factory :user, class: User do
    email
    name 'test_user'
    password '12345678'
    password_confirmation '12345678'
    confirmed_at Date.today
  end
end
