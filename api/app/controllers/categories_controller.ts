import type { HttpContext } from '@adonisjs/core/http'

import { CategoryServiceContract } from '#contracts/caterory_service_contract'
import { inject } from '@adonisjs/core'

@inject()
export default class CategoriesController {
  constructor(protected categoryService: CategoryServiceContract) {}

  public async index({ response }: HttpContext) {
    const categories = await this.categoryService.getAllCategories()
    return response.ok(categories)
  }

  public async show({ params, response }: HttpContext) {
    const categories = await this.categoryService.findCategoryById(params.id)
    return response.ok(categories)
  }
}
