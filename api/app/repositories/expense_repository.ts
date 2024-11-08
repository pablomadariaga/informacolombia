import { ExpenseRepositoryContract } from '#contracts/expense_repository_contract'
import Expense from '#models/expense'

/**
 * Repository for managing Expense data operations.
 */
export class ExpenseRepository implements ExpenseRepositoryContract {
  /**
   * Retrieves all expenses with their associated categories.
   * @returns {Promise<Expense[]>} - List of expenses with categories.
   */
  public async getAllExpenses(): Promise<Expense[]> {
    return await Expense.query().preload('category')
  }

  /**
   * Creates a new expense.
   * @param {Partial<Expense>} data - The expense data.
   * @returns {Promise<Expense>} - The created expense.
   */
  public async createExpense(data: Partial<Expense>): Promise<Expense> {
    const expense = await Expense.create(data)
    await expense.load('category')
    return expense
  }

  /**
   * Updates an existing expense.
   * @param {number} id - The expense ID.
   * @param {Partial<Expense>} data - The updated expense data.
   * @returns {Promise<Expense | null>} - The updated expense or null if not found.
   */
  public async updateExpense(id: number, data: Partial<Expense>): Promise<Expense | null> {
    const expense = await Expense.find(id)
    if (expense) {
      expense.merge(data)
      await expense.save()
      await expense.load('category')
      return expense
    }
    return null
  }

  /**
   * Deletes an expense by its ID.
   * @param {number} id - The expense ID.
   * @returns {Promise<boolean>} - True if deleted, otherwise false.
   */
  public async deleteExpense(id: number): Promise<boolean> {
    const expense = await Expense.find(id)
    if (expense) {
      await expense.delete()
      return true
    }
    return false
  }
}
