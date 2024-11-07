import Category from '#models/category'

export abstract class CategoryServiceContract {
  abstract getAllCategories(): Promise<Category[]>
  abstract findCategoryById(id: number): Promise<Category | null>
}
