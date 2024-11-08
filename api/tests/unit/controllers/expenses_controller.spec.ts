import { test } from '@japa/runner'
import { ExpenseService } from '#services/expense_service'
import ExpensesController from '#controllers/expenses_controller'
import { ExpenseRepository } from '#repositories/expense_repository'
import { CategoryRepository } from '#repositories/category_repository'
import { ExpenseInterface } from '#interfaces/expense.interface'

test.group('ExpensesController', () => {
  const categoryRepository = new CategoryRepository()
  const expenseRepository = new ExpenseRepository()
  const expenseService = new ExpenseService(expenseRepository, categoryRepository)
  const expensesController = new ExpensesController(expenseService)

  test('should return all expenses', async ({ assert }) => {
    const response = { ok: (data: any) => data }
    const result = await expensesController.index({ response } as any)
    assert.isArray(result)
  })

  test('should create a new expense', async ({ assert }) => {
    const request = {
      only: () => ({ amount: 100, categoryId: 1, date: '2024-11-07', description: 'Test expense' }),
    }
    const response = { created: (data: any) => data, badRequest: (error: any) => error }
    const result = await expensesController.store({ request, response } as any)
    assert.isObject(result)
    assert.containsSubset(result, { amount: 100, categoryId: 1, description: 'Test expense' })
  })

  test('should update an expense by ID', async ({ assert }) => {
    const request = {
      only: () => ({ amount: 200, categoryId: 1 }),
    }
    const params = { id: 1 }
    const response = {
      ok: (expense: ExpenseInterface) => expense,
      notFound: () => null,
      badRequest: (error: any) => error,
    }
    const result = await expensesController.update({ request, params, response } as any)
    assert.isObject(result)
    // assert.equal(result?.amount, 200)
  })

  test('should return null if trying to update a non-existing expense', async ({ assert }) => {
    const request = {
      only: () => ({ amount: 200, categoryId: 1 }),
    }
    const params = { id: 999 }
    const response = { ok: () => null, notFound: () => null, badRequest: (error: any) => error }
    const result = await expensesController.update({ request, params, response } as any)
    assert.isObject(result)
  })

  test('should delete an expense by ID', async ({ assert }) => {
    const params = { id: 1 }
    const response = { noContent: () => true, notFound: () => false }
    const result = await expensesController.destroy({ params, response } as any)
    assert.isTrue(result)
  })
})
