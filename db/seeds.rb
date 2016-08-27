200.times do |n|
  name  = Faker::Book.title
  color = Faker::Color.color_name
  grade_id = Faker::Number.between(1, 17)
  setter_id = Faker::Number.between(1, 4)
  zone_id = Faker::Number.between(1, 5)
  wall_id = Faker::Number.between(1, 4)
  start_date = Faker::Date.between(30.days.ago, Date.today)
  end_date = Faker::Date.between(30.days.from_now, 60.days.from_now)
  Route.create!(user_id:  '1',
               facility_id: '1',
               name:              name,
               color:             color,
               setdate:           start_date.strftime('%Y-%m-%d'),
               enddate:           end_date.strftime('%Y-%m-%d'),
               grade_id:  grade_id,
               zone_id: zone_id,
               wall_id: wall_id,
               setter_id: setter_id)
end
