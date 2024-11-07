import { ExpenseRepositoryContract } from '#contracts/expense_repository_contract'
import Expense from '#models/expense'

export default class ExpenseRepository implements ExpenseRepositoryContract {
  public async getAllExpenses(): Promise<Expense[]> {
    return await Expense.query().preload('category')
  }

  public async createExpense(data: Partial<Expense>): Promise<Expense> {
    return await Expense.create(data)
  }

  public async updateExpense(id: number, data: Partial<Expense>): Promise<Expense | null> {
    const expense = await Expense.find(id)
    if (expense) {
      expense.merge(data)
      await expense.save()
      return expense
    }
    return null
  }

  public async deleteExpense(id: number): Promise<boolean> {
    const expense = await Expense.find(id)
    if (expense) {
      await expense.delete()
      return true
    }
    return false
  }
}
