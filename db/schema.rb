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

ActiveRecord::Schema.define(version: 20160509131023) do

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

  create_table "routes", force: :cascade do |t|
    t.integer  "user_id",     limit: 4
    t.integer  "facility_id", limit: 4
    t.string   "name",        limit: 255
    t.string   "color",       limit: 255
    t.string   "setter",      limit: 255
    t.date     "setdate"
    t.date     "enddate"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.integer  "grade_id",    limit: 4
  end

  add_index "routes", ["facility_id"], name: "index_routes_on_facility_id", using: :btree
  add_index "routes", ["grade_id"], name: "index_routes_on_grade_id", using: :btree
  add_index "routes", ["user_id", "facility_id", "created_at"], name: "index_routes_on_user_id_and_facility_id_and_created_at", using: :btree
  add_index "routes", ["user_id"], name: "index_routes_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",              limit: 255
    t.string   "email",             limit: 255
    t.datetime "created_at",                                    null: false
    t.datetime "updated_at",                                    null: false
    t.string   "password_digest",   limit: 255
    t.string   "remember_digest",   limit: 255
    t.boolean  "admin",                         default: false
    t.string   "activation_digest", limit: 255
    t.boolean  "activated",                     default: false
    t.datetime "activated_at"
    t.string   "reset_digest",      limit: 255
    t.datetime "reset_sent_at"
    t.string   "role",              limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "facilities", "users"
  add_foreign_key "grades", "facilities"
  add_foreign_key "grades", "users"
  add_foreign_key "routes", "facilities"
  add_foreign_key "routes", "grades"
  add_foreign_key "routes", "users"
end
