import Category from '#models/category'
import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'

/**
 * Repository for managing Category data operations.
 */
export class CategoryRepository implements CategoryRepositoryContract {
  /**
   * Retrieves all categories.
   * @returns {Promise<Category[]>} - List of categories.
   */
  public async getAllCategories(): Promise<Category[]> {
    return await Category.all()
  }

  /**
   * Finds a category by its ID.
   * @param {number} id - The category ID.
   * @returns {Promise<Category | null>} - Category or null if not found.
   */
  public async findCategoryById(id: number): Promise<Category | null> {
    return await Category.find(id)
  }
}
