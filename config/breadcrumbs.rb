
# Root crumb
crumb :facility do |facility|
  link @facilty.name , admin_facility_routes_path(@facility)
end

# Issue list
crumb :routes do
  link "Routes", admin_facility_routes_path(@facility)
end

# Issue
crumb :route do |route|
  link route.name, route
  parent :routes
end

# If you want to split your breadcrumbs configuration over multiple files, you
# can create a folder named `config/breadcrumbs` and put your configuration
# files there. All *.rb files (e.g. `frontend.rb` or `products.rb`) in that
# folder are loaded and reloaded automatically when you change them, just like
# this file (`config/breadcrumbs.rb`).
