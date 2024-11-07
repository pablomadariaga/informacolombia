import { DateTime } from 'luxon'
import { CategoryInterface } from './category.interface.js'

export interface ExpenseInterface {
  id: number
  amount: number
  date: DateTime
  description?: string
  categoryId: number
  category: CategoryInterface
  createdAt: DateTime
  updatedAt: DateTime
}
