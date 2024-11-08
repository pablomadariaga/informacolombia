import { CategoryServiceContract } from '#contracts/caterory_service_contract'
import { CategoryInterface } from '#interfaces/category.interface'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

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
  public async index({ response }: HttpContext): Promise<void | CategoryInterface[]> {
    const categories = await this.categoryService.getAllCategories()
    return response.ok(
      categories.map((category) => {
        return category.serialize() as CategoryInterface
      })
    )
  }

  /**
   * Retrieves a single category by its ID.
   * @param {HttpContext} ctx - The HTTP context, containing parameters.
   * @returns {Promise<void>} - HTTP response with the category or error message.
   */
  public async show({ params, response }: HttpContext): Promise<void | CategoryInterface | null> {
    const category = await this.categoryService.findCategoryById(params.id)
    if (category) {
      return response.ok(category.serialize() as CategoryInterface)
    }
    return response.notFound({ message: 'category no found' })
  }
}
