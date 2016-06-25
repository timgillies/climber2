
# Root crumb
crumb :root do
  link "Home", admin_facility_routes_path
end

# Routes list
crumb :routes do
  link "Routes", admin_facility_routes_path
end

# Route
crumb :route do |route|
  link route.name, admin_facility_routes_path
  parent :routes
end

# Route
crumb :addroute do
  link "Add route", admin_facility_routes_path
  parent :routes
end

# Route
crumb :editroute do |route|
  link route.name, admin_facility_routes_path
  parent :routes
end

# If you want to split your breadcrumbs configuration over multiple files, you
# can create a folder named `config/breadcrumbs` and put your configuration
# files there. All *.rb files (e.g. `frontend.rb` or `products.rb`) in that
# folder are loaded and reloaded automatically when you change them, just like
# this file (`config/breadcrumbs.rb`).
