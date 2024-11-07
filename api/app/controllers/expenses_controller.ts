import type { HttpContext } from '@adonisjs/core/http'
import { ExpenseServiceContract } from '#contracts/expense_service_contract'
import { inject } from '@adonisjs/core'
import Expense from '#models/expense'
import { ExpenseInterface } from '#interfaces/expense.interface'

/**
 * Controller for handling expense-related requests.
 */
@inject()
export default class ExpensesController {
  constructor(protected expenseService: ExpenseServiceContract) {}

  /**
   * Retrieves all expenses.
   * @param {HttpContext} ctx - The HTTP context.
   * @returns {Promise<void|any>} - HTTP response with expenses.
   */
  public async index({ response }: HttpContext): Promise<void | ExpenseInterface[]> {
    const expenses = await this.expenseService.getAllExpenses()
    return response.ok(
      expenses.map((expense) => {
        return expense.serialize() as ExpenseInterface
      })
    )
  }

  /**
   * Creates a new expense.
   * @param {HttpContext} ctx - The HTTP context, containing request data.
   * @returns {Promise<void|any>} - HTTP response with the created expense or error message.
   */
  public async store({
    request,
    response,
  }: HttpContext): Promise<void | ExpenseInterface | { message: string }> {
    const data = request.only(['amount', 'categoryId', 'date', 'description'])
    try {
      const expense = await this.expenseService.createExpense(data)
      return response.created(expense.serialize() as ExpenseInterface)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Updates an existing expense.
   * @param {HttpContext} ctx - The HTTP context, containing request data and parameters.
   * @returns {Promise<void|any>} - HTTP response with the updated expense or error message.
   */
  public async update({
    request,
    params,
    response,
  }: HttpContext): Promise<void | ExpenseInterface | { message: string }> {
    const data = request.only(['amount', 'categoryId', 'date', 'description'])
    try {
      const expense = await this.expenseService.updateExpense(params.id, data)
      if (expense) {
        return response.ok(expense.serialize() as ExpenseInterface)
      }
      return response.notFound({ message: 'Expense not found or category no found' })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  /**
   * Deletes an expense by its ID.
   * @param {HttpContext} ctx - The HTTP context, containing parameters.
   * @returns {Promise<void|any>} - HTTP response indicating success or failure.
   */
  public async destroy({ params, response }: HttpContext): Promise<void | { message: string }> {
    const success = await this.expenseService.deleteExpense(params.id)
    if (success) {
      return response.noContent()
    }
    return response.notFound({ message: 'Expense not found' })
  }
}
