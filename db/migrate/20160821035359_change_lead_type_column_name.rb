class ChangeLeadTypeColumnName < ActiveRecord::Migration
  def change
    rename_column :leads, :type, :source
  end
end
