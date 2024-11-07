import Expense from '#models/expense'
import { ExpenseRepositoryContract } from '#contracts/expense_repository_contract'
import { CategoryRepositoryContract } from '#contracts/caterory_repository_contract'
import { ExpenseServiceContract } from '#contracts/expense_service_contract'
import { inject } from '@adonisjs/core'

@inject()
export class ExpenseService implements ExpenseServiceContract {
  constructor(
    private readonly expenseRepository: ExpenseRepositoryContract,
    private readonly categoryRepository: CategoryRepositoryContract
  ) {}

  public async getAllExpenses(): Promise<Expense[]> {
    return await this.expenseRepository.getAllExpenses()
  }

  public async createExpense(data: Partial<Expense>): Promise<Expense> {
    const category = await this.categoryRepository.findCategoryById(data.categoryId!)
    if (!category) {
      throw new Error('Invalid category ID')
    }
    return await this.expenseRepository.createExpense(data)
  }

  public async updateExpense(id: number, data: Partial<Expense>): Promise<Expense | null> {
    const category = await this.categoryRepository.findCategoryById(data.categoryId!)
    if (!category) {
      throw new Error('Invalid category ID')
    }
    return await this.expenseRepository.updateExpense(id, data)
  }

  public async deleteExpense(id: number): Promise<boolean> {
    return await this.expenseRepository.deleteExpense(id)
  }
}
