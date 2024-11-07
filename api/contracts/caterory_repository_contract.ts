import Category from '#models/category'

export abstract class CategoryRepositoryContract {
  abstract getAllCategories(): Promise<Category[]>
  abstract findCategoryById(id: number): Promise<Category | null>
}
