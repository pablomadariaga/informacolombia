import { DateTime } from 'luxon'

export interface CategoryInterface {
  id: number
  name: string
  createdAt: DateTime
  updatedAt: DateTime
}
