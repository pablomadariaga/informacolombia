import Expense from '#models/expense'
import { ExpenseRepositoryContract } from '#contracts/expense_repository_contract'
import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'
import { ExpenseServiceContract } from '#contracts/expense_service_contract'
import { inject } from '@adonisjs/core'

/**
 * Service for managing expense-related operations.
 */
@inject()
export class ExpenseService implements ExpenseServiceContract {
  constructor(
    private readonly expenseRepository: ExpenseRepositoryContract,
    private readonly categoryRepository: CategoryRepositoryContract
  ) {}

  /**
   * Retrieves all expenses, including associated categories.
   * @returns {Promise<Expense[]>} - List of expenses.
   */
  public async getAllExpenses(): Promise<Expense[]> {
    return await this.expenseRepository.getAllExpenses()
  }

  /**
   * Creates a new expense.
   * @param {Partial<Expense>} data - The expense data.
   * @returns {Promise<Expense>} - The created expense.
   * @throws {Error} - If the category ID is invalid.
   */
  public async createExpense(data: Partial<Expense>): Promise<Expense> {
    const category = await this.categoryRepository.findCategoryById(data.categoryId!)
    if (!category) {
      throw new Error('Invalid category ID')
    }
    return await this.expenseRepository.createExpense(data)
  }

  /**
   * Updates an existing expense.
   * @param {number} id - The expense ID.
   * @param {Partial<Expense>} data - The updated expense data.
   * @returns {Promise<Expense | null>} - The updated expense or null if not found.
   * @throws {Error} - If the category ID is invalid.
   */
  public async updateExpense(id: number, data: Partial<Expense>): Promise<Expense | null> {
    const category = await this.categoryRepository.findCategoryById(data.categoryId!)
    if (!category) {
      return null
    }
    return await this.expenseRepository.updateExpense(id, data)
  }

  /**
   * Deletes an expense by its ID.
   * @param {number} id - The expense ID.
   * @returns {Promise<boolean>} - True if deleted, otherwise false.
   */
  public async deleteExpense(id: number): Promise<boolean> {
    return await this.expenseRepository.deleteExpense(id)
  }
}
