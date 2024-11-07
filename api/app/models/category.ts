import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Expense from './expense.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

/**
 * Represents an expense category.
 */
export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  /**
   * Relationship with the Expense model
   */
  @hasMany(() => Expense)
  declare expense: HasMany<typeof Expense>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
