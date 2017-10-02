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

ActiveRecord::Schema.define(version: 20170914205158) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "facility_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["facility_id"], name: "index_admins_on_facility_id", using: :btree
    t.index ["user_id"], name: "index_admins_on_user_id", using: :btree
  end

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
    t.index ["user_id"], name: "index_charges_on_user_id", using: :btree
  end

  create_table "comp_invites", force: :cascade do |t|
    t.integer  "inviter_id"
    t.integer  "invitee_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "competition_id"
    t.index ["invitee_id"], name: "index_comp_invites_on_invitee_id", using: :btree
    t.index ["inviter_id"], name: "index_comp_invites_on_inviter_id", using: :btree
  end

  create_table "comp_relationships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "competition_id"
    t.string   "role_name"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["competition_id"], name: "index_comp_relationships_on_competition_id", using: :btree
    t.index ["user_id"], name: "index_comp_relationships_on_user_id", using: :btree
  end

  create_table "comp_routes", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "route_id"
    t.integer  "competition_id"
    t.index ["user_id"], name: "index_comp_routes_on_user_id", using: :btree
  end

  create_table "competitions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "facility_id"
    t.string   "name"
    t.string   "description"
    t.datetime "start_date"
    t.datetime "end_date"
    t.boolean  "private"
    t.string   "password"
    t.string   "password_confirmation"
    t.string   "logo_image_file_name"
    t.string   "logo_image_content_type"
    t.integer  "logo_image_file_size"
    t.datetime "logo_image_updated_at"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "comp_format"
    t.integer  "number_of_rounds"
    t.string   "discipline"
    t.integer  "attempts_allowed"
    t.float    "attempt_value"
    t.float    "flash_value"
    t.float    "onsight_value"
    t.float    "redpoint_value"
    t.index ["facility_id"], name: "index_competitions_on_facility_id", using: :btree
    t.index ["user_id"], name: "index_competitions_on_user_id", using: :btree
  end

  create_table "custom_colors", force: :cascade do |t|
    t.string   "color_hex"
    t.string   "color_name"
    t.string   "text_color_hex"
    t.integer  "user_id"
    t.integer  "facility_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
  end

  create_table "facilities", force: :cascade do |t|
    t.string   "name"
    t.string   "location"
    t.string   "addressline1"
    t.string   "addressline2"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "user_id"
    t.boolean  "custom"
    t.boolean  "vscale"
    t.boolean  "yds"
    t.integer  "plan_id"
    t.integer  "days_from_start_date"
    t.string   "country"
    t.boolean  "demo"
    t.boolean  "standard_colors"
    t.boolean  "public"
    t.string   "logo_image_file_name"
    t.string   "logo_image_content_type"
    t.integer  "logo_image_file_size"
    t.datetime "logo_image_updated_at"
    t.string   "header_image_file_name"
    t.string   "header_image_content_type"
    t.integer  "header_image_file_size"
    t.datetime "header_image_updated_at"
    t.string   "url"
    t.string   "phone_number"
    t.index ["user_id", "created_at"], name: "index_facilities_on_user_id_and_created_at", using: :btree
    t.index ["user_id"], name: "index_facilities_on_user_id", using: :btree
  end

  create_table "facility_grade_systems", force: :cascade do |t|
    t.integer  "facility_id"
    t.integer  "grade_system_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["facility_id"], name: "index_facility_grade_systems_on_facility_id", using: :btree
  end

  create_table "facility_roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "email"
    t.boolean  "confirmed"
    t.index ["facility_id"], name: "index_facility_roles_on_facility_id", using: :btree
    t.index ["user_id"], name: "index_facility_roles_on_user_id", using: :btree
  end

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
    t.index ["facility_id"], name: "index_facility_targets_on_facility_id", using: :btree
    t.index ["grade_id"], name: "index_facility_targets_on_grade_id", using: :btree
    t.index ["sub_child_zone_id"], name: "index_facility_targets_on_sub_child_zone_id", using: :btree
    t.index ["wall_id"], name: "index_facility_targets_on_wall_id", using: :btree
    t.index ["zone_id"], name: "index_facility_targets_on_zone_id", using: :btree
  end

  create_table "grade_systems", force: :cascade do |t|
    t.string   "name"
    t.string   "discipline"
    t.string   "description"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "category"
    t.index ["facility_id"], name: "index_grade_systems_on_facility_id", using: :btree
  end

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
    t.index ["grade_system_id"], name: "index_grades_on_grade_system_id", using: :btree
    t.index ["user_id"], name: "index_grades_on_user_id", using: :btree
  end

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
    t.index ["rateable_id", "rateable_type"], name: "index_rates_on_rateable_id_and_rateable_type", using: :btree
    t.index ["rater_id"], name: "index_rates_on_rater_id", using: :btree
  end

  create_table "rating_caches", force: :cascade do |t|
    t.integer  "cacheable_id"
    t.string   "cacheable_type"
    t.float    "avg",            null: false
    t.integer  "qty",            null: false
    t.string   "dimension"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["cacheable_id", "cacheable_type"], name: "index_rating_caches_on_cacheable_id_and_cacheable_type", using: :btree
  end

  create_table "registrations", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "plan_id"
    t.string   "card_token"
    t.string   "email"
    t.index ["plan_id"], name: "index_registrations_on_plan_id", using: :btree
    t.index ["user_id"], name: "index_registrations_on_user_id", using: :btree
  end

  create_table "relationships", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["followed_id"], name: "index_relationships_on_followed_id", using: :btree
    t.index ["follower_id", "followed_id"], name: "index_relationships_on_follower_id_and_followed_id", unique: true, using: :btree
    t.index ["follower_id"], name: "index_relationships_on_follower_id", using: :btree
  end

  create_table "route_likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.integer  "route_id"
    t.boolean  "like"
    t.string   "comment"
  end

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
    t.integer  "total_holds"
    t.integer  "foot_holds"
    t.index ["facility_id"], name: "index_routes_on_facility_id", using: :btree
    t.index ["grade_id"], name: "index_routes_on_grade_id", using: :btree
    t.index ["sub_child_zone_id"], name: "index_routes_on_sub_child_zone_id", using: :btree
    t.index ["user_id", "facility_id", "created_at"], name: "index_routes_on_user_id_and_facility_id_and_created_at", using: :btree
    t.index ["user_id"], name: "index_routes_on_user_id", using: :btree
    t.index ["wall_id"], name: "index_routes_on_wall_id", using: :btree
    t.index ["zone_id"], name: "index_routes_on_zone_id", using: :btree
  end

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
    t.index ["facility_id"], name: "index_setters_on_facility_id", using: :btree
    t.index ["user_id"], name: "index_setters_on_user_id", using: :btree
  end

  create_table "sub_child_zones", force: :cascade do |t|
    t.string   "name"
    t.integer  "wall_id"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["facility_id"], name: "index_sub_child_zones_on_facility_id", using: :btree
    t.index ["wall_id"], name: "index_sub_child_zones_on_wall_id", using: :btree
  end

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
    t.index ["user_id"], name: "index_subscriptions_on_user_id", using: :btree
  end

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
    t.index ["facility_id"], name: "index_tasks_on_facility_id", using: :btree
    t.index ["grade_id"], name: "index_tasks_on_grade_id", using: :btree
    t.index ["sub_child_zone_id"], name: "index_tasks_on_sub_child_zone_id", using: :btree
    t.index ["wall_id"], name: "index_tasks_on_wall_id", using: :btree
    t.index ["zone_id"], name: "index_tasks_on_zone_id", using: :btree
  end

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
    t.integer  "competition_id"
    t.index ["facility_id"], name: "index_ticks_on_facility_id", using: :btree
    t.index ["route_id"], name: "index_ticks_on_route_id", using: :btree
    t.index ["user_id"], name: "index_ticks_on_user_id", using: :btree
  end

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
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "walls", force: :cascade do |t|
    t.string   "name"
    t.integer  "facility_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
    t.integer  "vertical_ft"
    t.integer  "zone_id"
    t.float    "height"
    t.float    "width"
    t.float    "angle"
    t.index ["facility_id"], name: "index_walls_on_facility_id", using: :btree
    t.index ["user_id"], name: "index_walls_on_user_id", using: :btree
    t.index ["zone_id"], name: "index_walls_on_zone_id", using: :btree
  end

  create_table "zones", force: :cascade do |t|
    t.string   "name"
    t.integer  "facility_id"
    t.integer  "user_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.float    "height"
    t.float    "width"
    t.float    "angle"
    t.index ["facility_id"], name: "index_zones_on_facility_id", using: :btree
    t.index ["user_id"], name: "index_zones_on_user_id", using: :btree
  end

  add_foreign_key "admins", "facilities"
  add_foreign_key "admins", "users"
  add_foreign_key "charges", "users", on_delete: :nullify
  add_foreign_key "comp_invites", "competitions", on_delete: :nullify
  add_foreign_key "comp_relationships", "competitions", on_delete: :nullify
  add_foreign_key "comp_relationships", "users", on_delete: :nullify
  add_foreign_key "comp_routes", "competitions", on_delete: :nullify
  add_foreign_key "comp_routes", "routes", on_delete: :nullify
  add_foreign_key "comp_routes", "users", on_delete: :nullify
  add_foreign_key "competitions", "facilities", on_delete: :nullify
  add_foreign_key "competitions", "users", on_delete: :nullify
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
  add_foreign_key "route_likes", "routes", on_delete: :nullify
  add_foreign_key "route_likes", "users", on_delete: :nullify
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
  add_foreign_key "ticks", "competitions", on_delete: :nullify
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
