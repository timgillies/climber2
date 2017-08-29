class AddFormatToCompetition < ActiveRecord::Migration
  def change
    add_column :competitions, :comp_format, :string
    add_column :competitions, :number_of_rounds, :integer
    add_column :competitions, :discipline, :string
    add_column :competitions, :attempts_allowed, :integer
    add_column :competitions, :attempt_value, :float
    add_column :competitions, :flash_value, :float
    add_column :competitions, :onsight_value, :float
    add_column :competitions, :redpoint_value, :float
  end
end
