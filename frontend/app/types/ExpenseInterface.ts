// Expense interface defining the structure of an expense item
export interface Expense {
  id?: number;
  amount: number;
  categoryId: number;
  date: string;
  description: string;
}
