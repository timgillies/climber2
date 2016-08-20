200.times do |n|
  name  = Faker::Book.title
  color = Faker::Color.color_name
  grade_id = Faker::Number.between(18, 32)
  setter_id = Faker::Number.between(2, 6)
  zone_id = Faker::Number.between(7, 12)
  wall_id = Faker::Number.between(2, 6)
  start_date = Faker::Date.between(30.days.ago, Date.today)
  end_date = Faker::Date.between(30.days.from_now, 60.days.from_now)
  Route.create!(user_id:  '5',
               facility_id: '3',
               name:              name,
               color:             color,
               setdate:           start_date.strftime('%Y-%m-%d'),
               enddate:           end_date.strftime('%Y-%m-%d'),
               grade_id:  grade_id,
               zone_id: zone_id,
               wall_id: wall_id,
               setter_id: setter_id)
end
