import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'
import { CategoryServiceContract } from '#contracts/caterory_service_contract'
import Category from '#models/category'
import { inject } from '@adonisjs/core'

@inject()
export class CategoryService implements CategoryServiceContract {
  constructor(private readonly categoryRepository: CategoryRepositoryContract) {}

  public async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories()
  }

  public async findCategoryById(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.findCategoryById(id)
    if (!category) {
      throw new Error('Invalid category ID')
    }
    return category
  }
}
