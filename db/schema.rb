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

ActiveRecord::Schema.define(version: 20160802023142) do

  create_table "admins", force: :cascade do |t|
    t.integer  "user_id",     limit: 4
    t.integer  "facility_id", limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "admins", ["facility_id"], name: "index_admins_on_facility_id", using: :btree
  add_index "admins", ["user_id"], name: "index_admins_on_user_id", using: :btree

  create_table "average_caches", force: :cascade do |t|
    t.integer  "rater_id",      limit: 4
    t.integer  "rateable_id",   limit: 4
    t.string   "rateable_type", limit: 255
    t.float    "avg",           limit: 24,  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "facilities", force: :cascade do |t|
    t.string   "name",         limit: 255
    t.string   "location",     limit: 255
    t.string   "addressline1", limit: 255
    t.string   "addressline2", limit: 255
    t.string   "city",         limit: 255
    t.string   "state",        limit: 255
    t.string   "zipcode",      limit: 255
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "user_id",      limit: 4
    t.boolean  "custom"
  end

  add_index "facilities", ["user_id", "created_at"], name: "index_facilities_on_user_id_and_created_at", using: :btree
  add_index "facilities", ["user_id"], name: "index_facilities_on_user_id", using: :btree

  create_table "grades", force: :cascade do |t|
    t.string   "grade",       limit: 255
    t.string   "system",      limit: 255
    t.string   "discipline",  limit: 255
    t.integer  "rank",        limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "facility_id", limit: 4
    t.integer  "user_id",     limit: 4
  end

  add_index "grades", ["facility_id"], name: "index_grades_on_facility_id", using: :btree
  add_index "grades", ["user_id"], name: "index_grades_on_user_id", using: :btree

  create_table "overall_averages", force: :cascade do |t|
    t.integer  "rateable_id",   limit: 4
    t.string   "rateable_type", limit: 255
    t.float    "overall_avg",   limit: 24,  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "rates", force: :cascade do |t|
    t.integer  "rater_id",      limit: 4
    t.integer  "rateable_id",   limit: 4
    t.string   "rateable_type", limit: 255
    t.float    "stars",         limit: 24,  null: false
    t.string   "dimension",     limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rates", ["rateable_id", "rateable_type"], name: "index_rates_on_rateable_id_and_rateable_type", using: :btree
  add_index "rates", ["rater_id"], name: "index_rates_on_rater_id", using: :btree

  create_table "rating_caches", force: :cascade do |t|
    t.integer  "cacheable_id",   limit: 4
    t.string   "cacheable_type", limit: 255
    t.float    "avg",            limit: 24,  null: false
    t.integer  "qty",            limit: 4,   null: false
    t.string   "dimension",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "rating_caches", ["cacheable_id", "cacheable_type"], name: "index_rating_caches_on_cacheable_id_and_cacheable_type", using: :btree

  create_table "routes", force: :cascade do |t|
    t.integer  "user_id",     limit: 4
    t.integer  "facility_id", limit: 4
    t.string   "name",        limit: 255
    t.string   "color",       limit: 255
    t.date     "setdate"
    t.date     "enddate"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "grade_id",    limit: 4
    t.integer  "zone_id",     limit: 4
    t.integer  "wall_id",     limit: 4
    t.string   "discipline",  limit: 255
    t.integer  "setter_id",   limit: 4
    t.text     "description", limit: 65535
    t.boolean  "tagged"
  end

  add_index "routes", ["facility_id"], name: "index_routes_on_facility_id", using: :btree
  add_index "routes", ["grade_id"], name: "index_routes_on_grade_id", using: :btree
  add_index "routes", ["setter_id"], name: "index_routes_on_setter_id", using: :btree
  add_index "routes", ["user_id", "facility_id", "created_at"], name: "index_routes_on_user_id_and_facility_id_and_created_at", using: :btree
  add_index "routes", ["user_id"], name: "index_routes_on_user_id", using: :btree
  add_index "routes", ["wall_id"], name: "index_routes_on_wall_id", using: :btree
  add_index "routes", ["zone_id"], name: "index_routes_on_zone_id", using: :btree

  create_table "setters", force: :cascade do |t|
    t.string   "first_name",  limit: 255
    t.string   "last_name",   limit: 255
    t.string   "nick_name",   limit: 255
    t.string   "email",       limit: 255
    t.integer  "facility_id", limit: 4
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.integer  "user_id",     limit: 4
    t.boolean  "active",                  default: true
  end

  add_index "setters", ["facility_id"], name: "index_setters_on_facility_id", using: :btree
  add_index "setters", ["user_id"], name: "index_setters_on_user_id", using: :btree

  create_table "ticks", force: :cascade do |t|
    t.integer  "user_id",     limit: 4
    t.integer  "route_id",    limit: 4
    t.string   "tick_type",   limit: 255
    t.string   "description", limit: 255
    t.date     "date"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "facility_id", limit: 4
    t.boolean  "lead"
  end

  add_index "ticks", ["facility_id"], name: "index_ticks_on_facility_id", using: :btree
  add_index "ticks", ["route_id"], name: "index_ticks_on_route_id", using: :btree
  add_index "ticks", ["user_id"], name: "index_ticks_on_user_id", using: :btree

  create_table "ticktypes", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "value",      limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",                   limit: 255
    t.string   "email",                  limit: 255
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "password_digest",        limit: 255
    t.string   "remember_digest",        limit: 255
    t.boolean  "admin",                              default: false
    t.string   "activation_digest",      limit: 255
    t.boolean  "activated",                          default: false
    t.datetime "activated_at"
    t.string   "reset_digest",           limit: 255
    t.datetime "reset_sent_at"
    t.string   "role",                   limit: 255
    t.string   "encrypted_password",     limit: 255, default: "",    null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "confirmation_token",     limit: 255
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email",      limit: 255
    t.string   "remember_token",         limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "walls", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.integer  "facility_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "user_id",     limit: 4
    t.integer  "vertical_ft", limit: 4
  end

  add_index "walls", ["facility_id"], name: "index_walls_on_facility_id", using: :btree
  add_index "walls", ["user_id"], name: "index_walls_on_user_id", using: :btree

  create_table "zones", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.integer  "facility_id", limit: 4
    t.integer  "user_id",     limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "zones", ["facility_id"], name: "index_zones_on_facility_id", using: :btree
  add_index "zones", ["user_id"], name: "fk_rails_36b0b64bdb", using: :btree

  add_foreign_key "admins", "facilities"
  add_foreign_key "admins", "users"
  add_foreign_key "facilities", "users"
  add_foreign_key "grades", "facilities"
  add_foreign_key "grades", "users"
  add_foreign_key "routes", "facilities"
  add_foreign_key "routes", "grades", on_delete: :nullify
  add_foreign_key "routes", "setters", on_delete: :nullify
  add_foreign_key "routes", "users"
  add_foreign_key "routes", "walls", on_delete: :nullify
  add_foreign_key "routes", "zones", on_delete: :nullify
  add_foreign_key "setters", "facilities", on_delete: :nullify
  add_foreign_key "setters", "users", on_delete: :nullify
  add_foreign_key "ticks", "facilities", on_delete: :nullify
  add_foreign_key "ticks", "routes", on_delete: :nullify
  add_foreign_key "ticks", "users"
  add_foreign_key "walls", "facilities"
  add_foreign_key "walls", "users"
  add_foreign_key "zones", "facilities"
  add_foreign_key "zones", "users"
end
