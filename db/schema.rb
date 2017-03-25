# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170320201615) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "facility_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "admins", ["facility_id"], name: "index_admins_on_facility_id", using: :btree
  add_index "admins", ["user_id"], name: "index_admins_on_user_id", using: :btree

  create_table "average_caches", force: :cascade do |t|
    t.integer  "rater_id"
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.float    "avg",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "charges", force: :cascade do |t|
    t.string   "email"
    t.string   "card_token"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "charges", ["user_id"], name: "index_charges_on_user_id", using: :btree

  create_table "custom_colors", force: :cascade do |t|
    t.string   "color_hex"
    t.string   "color_name"
    t.string   "text_color_hex"
    t.integer  "user_id"
    t.integer  "facility_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "facilities", force: :cascade do |t|
    t.string   "name"
    t.string   "location"
    t.string   "addressline1"
    t.string   "addressline2"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.integer  "user_id"
    t.boolean  "custom"
    t.boolean  "vscale"
    t.boolean  "yds"
    t.integer  "plan_id"
    t.integer  "days_from_start_date"
    t.string   "country"
    t.boolean  "demo"
    t.boolean  "standard_colors"
  end

  add_index "facilities", ["user_id", "created_at"], name: "index_facilities_on_user_id_and_created_at", using: :btree
  add_index "facilities", ["user_id"], name: "index_facilities_on_user_id", using: :btree

  create_table "facility_grade_systems", force: :cascade do |t|
    t.integer  "facility_id"
    t.integer  "grade_system_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "facility_grade_systems", ["facility_id"], name: "index_facility_grade_systems_on_facility_id", using: :btree

  create_table "facility_roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "email"
    t.boolean  "confirmed"
  end

  add_index "facility_roles", ["facility_id"], name: "index_facility_roles_on_facility_id", using: :btree
  add_index "facility_roles", ["user_id"], name: "index_facility_roles_on_user_id", using: :btree

  create_table "facility_targets", force: :cascade do |t|
    t.integer  "facility_id"
    t.integer  "user_id"
    t.integer  "grade_id"
    t.integer  "zone_id"
    t.integer  "wall_id"
    t.integer  "sub_child_zone_id"
    t.integer  "value"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "facility_targets", ["facility_id"], name: "index_facility_targets_on_facility_id", using: :btree
  add_index "facility_targets", ["grade_id"], name: "index_facility_targets_on_grade_id", using: :btree
  add_index "facility_targets", ["sub_child_zone_id"], name: "index_facility_targets_on_sub_child_zone_id", using: :btree
  add_index "facility_targets", ["wall_id"], name: "index_facility_targets_on_wall_id", using: :btree
  add_index "facility_targets", ["zone_id"], name: "index_facility_targets_on_zone_id", using: :btree

  create_table "grade_systems", force: :cascade do |t|
    t.string   "name"
    t.string   "discipline"
    t.string   "description"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "category"
  end

  add_index "grade_systems", ["facility_id"], name: "index_grade_systems_on_facility_id", using: :btree

  create_table "grades", force: :cascade do |t|
    t.string   "grade"
    t.string   "system"
    t.string   "discipline"
    t.decimal  "rank"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "user_id"
    t.decimal  "range_start"
    t.decimal  "range_end"
    t.string   "system_name"
    t.integer  "grade_system_id"
  end

  add_index "grades", ["grade_system_id"], name: "index_grades_on_grade_system_id", using: :btree
  add_index "grades", ["user_id"], name: "index_grades_on_user_id", using: :btree

  create_table "leads", force: :cascade do |t|
    t.string   "email"
    t.string   "source"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "overall_averages", force: :cascade do |t|
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.float    "overall_avg",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "plans", force: :cascade do |t|
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "name"
    t.string   "description"
    t.decimal  "price"
  end

  create_table "rates", force: :cascade do |t|
    t.integer  "rater_id"
    t.integer  "rateable_id"
    t.string   "rateable_type"
    t.float    "stars",         null: false
    t.string   "dimension"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rates", ["rateable_id", "rateable_type"], name: "index_rates_on_rateable_id_and_rateable_type", using: :btree
  add_index "rates", ["rater_id"], name: "index_rates_on_rater_id", using: :btree

  create_table "rating_caches", force: :cascade do |t|
    t.integer  "cacheable_id"
    t.string   "cacheable_type"
    t.float    "avg",            null: false
    t.integer  "qty",            null: false
    t.string   "dimension"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rating_caches", ["cacheable_id", "cacheable_type"], name: "index_rating_caches_on_cacheable_id_and_cacheable_type", using: :btree

  create_table "registrations", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "plan_id"
    t.string   "card_token"
    t.string   "email"
  end

  add_index "registrations", ["plan_id"], name: "index_registrations_on_plan_id", using: :btree
  add_index "registrations", ["user_id"], name: "index_registrations_on_user_id", using: :btree

  create_table "routes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "facility_id"
    t.string   "name"
    t.string   "color"
    t.date     "setdate"
    t.date     "enddate"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "grade_id"
    t.integer  "zone_id"
    t.integer  "wall_id"
    t.string   "discipline"
    t.text     "description"
    t.boolean  "tagged"
    t.integer  "sub_child_zone_id"
    t.integer  "risk"
    t.integer  "intensity"
    t.integer  "complexity"
    t.string   "status"
    t.text     "task_description"
    t.integer  "task_number"
    t.string   "task_type"
    t.integer  "assigner_id"
    t.integer  "assignee_id"
    t.integer  "task_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "color_hex"
  end

  add_index "routes", ["facility_id"], name: "index_routes_on_facility_id", using: :btree
  add_index "routes", ["grade_id"], name: "index_routes_on_grade_id", using: :btree
  add_index "routes", ["sub_child_zone_id"], name: "index_routes_on_sub_child_zone_id", using: :btree
  add_index "routes", ["user_id", "facility_id", "created_at"], name: "index_routes_on_user_id_and_facility_id_and_created_at", using: :btree
  add_index "routes", ["user_id"], name: "index_routes_on_user_id", using: :btree
  add_index "routes", ["wall_id"], name: "index_routes_on_wall_id", using: :btree
  add_index "routes", ["zone_id"], name: "index_routes_on_zone_id", using: :btree

  create_table "setters", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "nick_name"
    t.string   "email"
    t.integer  "facility_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "user_id"
    t.boolean  "active",      default: true
  end

  add_index "setters", ["facility_id"], name: "index_setters_on_facility_id", using: :btree
  add_index "setters", ["user_id"], name: "index_setters_on_user_id", using: :btree

  create_table "sub_child_zones", force: :cascade do |t|
    t.string   "name"
    t.integer  "wall_id"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sub_child_zones", ["facility_id"], name: "index_sub_child_zones_on_facility_id", using: :btree
  add_index "sub_child_zones", ["wall_id"], name: "index_sub_child_zones_on_wall_id", using: :btree

  create_table "subscriptions", force: :cascade do |t|
    t.string   "email"
    t.string   "card_token"
    t.integer  "user_id"
    t.integer  "plan_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.date     "end_date"
    t.string   "customer_id"
    t.integer  "facility_id"
    t.string   "stripe_subscription_id"
    t.string   "stripe_last_four"
    t.integer  "start"
    t.string   "status"
    t.integer  "trial_start"
    t.integer  "trial_end"
    t.integer  "current_period_start"
    t.integer  "current_period_end"
    t.integer  "ended_at"
    t.integer  "canceled_at"
    t.string   "stripe_plan_id"
    t.integer  "stripe_plan_amount"
    t.string   "stripe_plan_interval"
    t.integer  "stripe_plan_interval_count"
    t.integer  "stripe_plan_created"
  end

  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "assigner_id"
    t.integer  "assignee_id"
    t.integer  "facility_id"
    t.string   "name"
    t.string   "color"
    t.date     "setdate"
    t.date     "enddate"
    t.integer  "grade_id"
    t.integer  "zone_id"
    t.integer  "wall_id"
    t.string   "discipline"
    t.text     "description"
    t.boolean  "tagged"
    t.integer  "sub_child_zone_id"
    t.string   "status"
    t.text     "task_description"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "task_type"
    t.integer  "task_number"
    t.integer  "completed_by_id"
    t.date     "completed_at"
    t.integer  "route_id"
    t.string   "color_hex"
  end

  add_index "tasks", ["facility_id"], name: "index_tasks_on_facility_id", using: :btree
  add_index "tasks", ["grade_id"], name: "index_tasks_on_grade_id", using: :btree
  add_index "tasks", ["sub_child_zone_id"], name: "index_tasks_on_sub_child_zone_id", using: :btree
  add_index "tasks", ["wall_id"], name: "index_tasks_on_wall_id", using: :btree
  add_index "tasks", ["zone_id"], name: "index_tasks_on_zone_id", using: :btree

  create_table "ticks", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "route_id"
    t.string   "tick_type"
    t.string   "description"
    t.date     "date"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "facility_id"
    t.boolean  "lead"
    t.string   "name"
    t.string   "color_hex"
    t.integer  "grade_id"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "color"
    t.integer  "zone_id"
    t.integer  "wall_id"
    t.integer  "grade_vote_id"
  end

  add_index "ticks", ["facility_id"], name: "index_ticks_on_facility_id", using: :btree
  add_index "ticks", ["route_id"], name: "index_ticks_on_route_id", using: :btree
  add_index "ticks", ["user_id"], name: "index_ticks_on_user_id", using: :btree

  create_table "ticktypes", force: :cascade do |t|
    t.string   "name"
    t.integer  "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "password_digest"
    t.string   "remember_digest"
    t.boolean  "admin",                  default: false
    t.string   "activation_digest"
    t.boolean  "activated",              default: false
    t.datetime "activated_at"
    t.string   "reset_digest"
    t.datetime "reset_sent_at"
    t.string   "role"
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "remember_token"
    t.string   "activation_token"
    t.string   "uid"
    t.string   "provider"
    t.string   "image"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "link"
    t.string   "gender"
    t.string   "location"
    t.string   "zip"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "walls", force: :cascade do |t|
    t.string   "name"
    t.integer  "facility_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
    t.integer  "vertical_ft"
    t.integer  "zone_id"
  end

  add_index "walls", ["facility_id"], name: "index_walls_on_facility_id", using: :btree
  add_index "walls", ["user_id"], name: "index_walls_on_user_id", using: :btree
  add_index "walls", ["zone_id"], name: "index_walls_on_zone_id", using: :btree

  create_table "zones", force: :cascade do |t|
    t.string   "name"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "zones", ["facility_id"], name: "index_zones_on_facility_id", using: :btree
  add_index "zones", ["user_id"], name: "index_zones_on_user_id", using: :btree

  add_foreign_key "admins", "facilities"
  add_foreign_key "admins", "users"
  add_foreign_key "charges", "users", on_delete: :nullify
  add_foreign_key "custom_colors", "facilities", on_delete: :nullify
  add_foreign_key "custom_colors", "users", on_delete: :nullify
  add_foreign_key "facilities", "plans", on_delete: :nullify
  add_foreign_key "facilities", "users"
  add_foreign_key "facility_grade_systems", "facilities"
  add_foreign_key "facility_grade_systems", "grade_systems"
  add_foreign_key "facility_roles", "facilities"
  add_foreign_key "facility_roles", "users"
  add_foreign_key "facility_targets", "facilities"
  add_foreign_key "facility_targets", "grades"
  add_foreign_key "facility_targets", "sub_child_zones"
  add_foreign_key "facility_targets", "users"
  add_foreign_key "facility_targets", "walls"
  add_foreign_key "facility_targets", "zones"
  add_foreign_key "grade_systems", "facilities", on_delete: :nullify
  add_foreign_key "grade_systems", "users", on_delete: :nullify
  add_foreign_key "grades", "grade_systems", on_delete: :nullify
  add_foreign_key "grades", "users"
  add_foreign_key "registrations", "plans", on_delete: :nullify
  add_foreign_key "registrations", "users"
  add_foreign_key "routes", "facilities"
  add_foreign_key "routes", "grades", on_delete: :nullify
  add_foreign_key "routes", "sub_child_zones", on_delete: :nullify
  add_foreign_key "routes", "users"
  add_foreign_key "routes", "walls", on_delete: :nullify
  add_foreign_key "routes", "zones", on_delete: :nullify
  add_foreign_key "setters", "facilities", on_delete: :nullify
  add_foreign_key "setters", "users", on_delete: :nullify
  add_foreign_key "sub_child_zones", "facilities"
  add_foreign_key "sub_child_zones", "users"
  add_foreign_key "sub_child_zones", "walls"
  add_foreign_key "subscriptions", "facilities", on_delete: :nullify
  add_foreign_key "subscriptions", "plans", on_delete: :nullify
  add_foreign_key "subscriptions", "users", on_delete: :nullify
  add_foreign_key "tasks", "facilities", on_delete: :nullify
  add_foreign_key "tasks", "grades", on_delete: :nullify
  add_foreign_key "tasks", "sub_child_zones", on_delete: :nullify
  add_foreign_key "tasks", "walls", on_delete: :nullify
  add_foreign_key "tasks", "zones", on_delete: :nullify
  add_foreign_key "ticks", "facilities", on_delete: :nullify
  add_foreign_key "ticks", "grades", on_delete: :nullify
  add_foreign_key "ticks", "routes", on_delete: :nullify
  add_foreign_key "ticks", "users"
  add_foreign_key "ticks", "walls", on_delete: :nullify
  add_foreign_key "ticks", "zones", on_delete: :nullify
  add_foreign_key "walls", "facilities"
  add_foreign_key "walls", "users"
  add_foreign_key "walls", "zones", on_delete: :nullify
  add_foreign_key "zones", "facilities"
  add_foreign_key "zones", "users"
end
