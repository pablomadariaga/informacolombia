import type { HttpContext } from '@adonisjs/core/http'

import { ExpenseServiceContract } from '#contracts/expense_service_contract'
import { inject } from '@adonisjs/core'

@inject()
export default class ExpensesController {
  constructor(protected expenseService: ExpenseServiceContract) {}

  public async index({ response }: HttpContext) {
    const expenses = await this.expenseService.getAllExpenses()
    return response.ok(expenses)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['amount', 'categoryId', 'date', 'description'])
    try {
      const expense = await this.expenseService.createExpense(data)
      return response.created(expense)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async update({ request, params, response }: HttpContext) {
    const data = request.only(['amount', 'categoryId', 'date', 'description'])
    try {
      const expense = await this.expenseService.updateExpense(params.id, data)
      if (expense) {
        return response.ok(expense)
      }
      return response.notFound({ message: 'Expense not found' })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    const success = await this.expenseService.deleteExpense(params.id)
    if (success) {
      return response.noContent()
    }
    return response.notFound({ message: 'Expense not found' })
  }
}
