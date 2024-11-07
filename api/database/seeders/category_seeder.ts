import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      { name: 'Food' },
      { name: 'Transport' },
      { name: 'Entertainment' },
      { name: 'Utilities' },
    ])
  }
}
