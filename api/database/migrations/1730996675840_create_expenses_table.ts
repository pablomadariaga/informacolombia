import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').comment('Primary key for expense')
      table.float('amount').notNullable().comment('Amount of the expense')
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .notNullable()
        .comment('Foreign key referencing categories table')
      table.date('date').notNullable().comment('Date of the expense')
      table.string('description', 255).nullable().comment('Optional description of the expense')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
