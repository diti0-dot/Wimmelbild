class CreateCharacters < ActiveRecord::Migration[8.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.float :pos_x
      t.float :pos_y
      t.boolean :is_found, default: false

      t.timestamps
    end
  end
end
