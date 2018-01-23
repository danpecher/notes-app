class ChangeNoteContentToJson < ActiveRecord::Migration[5.1]
  def change
    remove_column :notes, :content
    add_column :notes, :content, :jsonb
  end
end
