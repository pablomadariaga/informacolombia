import { test } from '@japa/runner'
import { CategoryService } from '#services/category_service'
import CategoriesController from '#controllers/categories_controller'
import { CategoryRepository } from '#repositories/category_repository'

test.group('CategoriesController', () => {
  const categoryRepository = new CategoryRepository()
  const categoryService = new CategoryService(categoryRepository)
  const categoriesController = new CategoriesController(categoryService)

  test('should return all categories', async ({ assert }) => {
    const response = await categoriesController.index({
      response: { ok: (data: any) => data },
    } as any)
    assert.isArray(response)
  })

  test('should return a category by ID', async ({ assert }) => {
    const params = { id: 1 }
    const response = await categoriesController.show({
      params,
      response: { ok: (data: any) => data },
    } as any)
    assert.isObject(response)
    assert.containsSubset(response, { id: 1, name: 'Food' })
  })

  test('should return null if category ID is invalid', async ({ assert }) => {
    const params = { id: 999 }
    const response = await categoriesController.show({
      params,
      response: { ok: (data: any) => data },
    } as any)
    assert.isNull(response)
  })
})
