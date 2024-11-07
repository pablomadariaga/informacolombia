import Category from '#models/category'
import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'

export class CategoryRepository implements CategoryRepositoryContract {
  public async getAllCategories(): Promise<Category[]> {
    return await Category.all()
  }

  public async findCategoryById(id: number): Promise<Category | null> {
    return await Category.find(id)
  }
}
