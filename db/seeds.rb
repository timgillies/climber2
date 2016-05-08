User.create!(name:  "Example User",
             email: "example@railstutorial.org",
             password:              "foobar",
             password_confirmation: "foobar",
             admin: true,
             activated: true,
             activated_at: Time.zone.now.to_datetime,
             role: "admin")

User.create!(name:  "Tim Gillies",
            email: "timothy.gillies@colorado.edu",
            password:              "5pearl",
            password_confirmation: "5pearl",
            admin: true,
            activated: true,
            activated_at: Time.zone.now.to_datetime,
            role: "facility_admin")

99.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railstutorial.org"
  password = "password"
  role = "user"
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password,
               activated: true,
               activated_at: Time.zone.now.to_datetime,
               role:  role)
end

users = User.order(:created_at).take(6)
3.times do
  name = Faker::Company.name
  location = Faker::Address.city
  addressline1 = Faker::Address.street_address
  addressline2 = Faker::Address.secondary_address
  city = Faker::Address.city
  state = Faker::Address.state
  zipcode = Faker::Address.zip

  users.each { |user| user.facilities.create!(name: name,
                                              location: location,
                                              addressline1: addressline1,
                                              addressline2: addressline2,
                                              city: city,
                                              state: state,
                                              zipcode: zipcode) }
end
