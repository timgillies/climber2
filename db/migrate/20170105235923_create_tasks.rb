class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer         :assigner_id
      t.integer         :assignee_id
      t.references      :facility, index: true, foreign_key: {on_delete: :nullify}
      t.string          :name
      t.string          :color
      t.date            :setdate
      t.date            :enddate
      t.references      :grade, index: true, foreign_key: {on_delete: :nullify}
      t.references      :zone, index: true, foreign_key: {on_delete: :nullify}
      t.references      :wall, index: true, foreign_key: {on_delete: :nullify}
      t.string          :discipline
      t.text            :description
      t.boolean         :tagged
      t.references      :sub_child_zone, index: true, foreign_key: {on_delete: :nullify}
      t.string          :status
      t.text            :task_description
      t.timestamps null: false
    end
  end
end
