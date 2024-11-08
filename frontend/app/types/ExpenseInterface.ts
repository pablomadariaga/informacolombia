import { Category } from "./CategoryInterface";

// Expense interface defining the structure of an expense item
export interface Expense {
  id?: number;
  amount: number;
  category?: Category;
  categoryId: number;
  date: string;
  description: string;
}
