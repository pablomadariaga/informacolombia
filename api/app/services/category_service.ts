import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'
import { CategoryServiceContract } from '#contracts/caterory_service_contract'
import Category from '#models/category'
import { inject } from '@adonisjs/core'

/**
 * Service for managing category-related operations.
 */
@inject()
export class CategoryService implements CategoryServiceContract {
  constructor(private readonly categoryRepository: CategoryRepositoryContract) {}

  /**
   * Retrieves all categories.
   * @returns {Promise<Category[]>} - List of categories.
   */
  public async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories()
  }

  /**
   * Finds a category by its ID.
   * @param {number} id - The category ID.
   * @returns {Promise<Category | null>} - The found category or null if not found.
   * @throws {Error} - If the category ID is invalid.
   */
  public async findCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findCategoryById(id)
  }
}
