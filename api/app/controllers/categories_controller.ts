import type { HttpContext } from '@adonisjs/core/http'
import { CategoryServiceContract } from '#contracts/caterory_service_contract'
import { inject } from '@adonisjs/core'
import Category from '#models/category'
import { CategoryInterface } from '#interfaces/category.interface'

/**
 * Controller for handling category-related requests.
 */
@inject()
export default class CategoriesController {
  constructor(protected categoryService: CategoryServiceContract) {}

  /**
   * Retrieves all categories.
   * @param {HttpContext} ctx - The HTTP context.
   * @returns {Promise<void>} - HTTP response with categories.
   */
  public async index({ response }: HttpContext): Promise<void | Category[]> {
    const categories = await this.categoryService.getAllCategories()
    return response.ok(categories)
  }

  /**
   * Retrieves a single category by its ID.
   * @param {HttpContext} ctx - The HTTP context, containing parameters.
   * @returns {Promise<void>} - HTTP response with the category or error message.
   */
  public async show({ params, response }: HttpContext): Promise<void | CategoryInterface | null> {
    const category = await this.categoryService.findCategoryById(params.id)
    return response.ok(category)
  }
}
