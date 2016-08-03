200.times do |n|
  name  = Faker::Name.title
  color = Faker::Color.color_name
  grade_id = Faker::Number.between(151, 194)
  setter_id = Faker::Number.between(1, 3)
  zone_id = Faker::Number.between(26, 29)
  wall_id = Faker::Number.between(24, 27)
  Route.create!(user_id:  '2',
               facility_id: '27',
               name:              name,
               color:             color,
               setdate: Date.today.strftime('%Y-%m-%d'),
               enddate: 30.days.from_now.strftime('%Y-%m-%d'),
               grade_id:  grade_id,
               zone_id: zone_id,
               wall_id: wall_id,
               setter_id: setter_id)
end
