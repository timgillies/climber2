source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '>= 5.0.0.rc2', '< 5.1'
# Use mysql as the database for Active Record
gem 'pg', '~> 0.18'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

gem 'bcrypt', '3.1.7'
gem 'faker', '1.6.6'
gem 'bower-rails'
gem 'stripe'
gem "omniauth-google-oauth2"

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'bootstrap-sass', '3.2.0.0'

gem 'cancan'
gem 'devise'
gem 'filterrific'
gem 'kaminari'
gem 'bootstrap-kaminari-views'
gem 'momentjs-rails', '>= 2.9.0'
gem 'omniauth-facebook'
gem 'paperclip'
gem 'aws-sdk', '~> 2.3'
gem 'jquery-minicolors-rails'
gem "parsley-rails"
gem "font-awesome-rails"
gem "toastr-rails"
gem 'delayed_job_active_record'
gem 'nprogress-rails'
gem 'area'
gem 'newrelic_rpm'
gem 'turbolinks', '~> 5.0.0'
gem "lazyload-rails"
gem 'sprockets', '3.7.1'
gem 'rubocop', require: false
gem 'jquery-infinite-pages'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'capybara'
  gem 'guard-rspec'
  gem 'spring-commands-rspec'
  gem 'vcr'
end

group :test do
  gem 'minitest-reporters'
  gem 'mini_backtrace'
  gem 'guard'
  gem 'guard-minitest'
  gem 'webmock'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring',  '~> 1.7.2'
  gem 'bullet'
end

group :production do
  gem 'rails_12factor', '0.0.2'
  gem 'puma',           '3.1.0'
end
