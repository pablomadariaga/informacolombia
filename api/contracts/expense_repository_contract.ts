import Expense from '#models/expense'

export abstract class ExpenseRepositoryContract {
  abstract getAllExpenses(): Promise<Expense[]>
  abstract createExpense(data: Partial<Expense>): Promise<Expense>
  abstract updateExpense(id: number, data: Partial<Expense>): Promise<Expense | null>
  abstract deleteExpense(id: number): Promise<boolean>
}
