"use client";

import { useEffect } from "react";
import { deleteExpense, getExpenses } from "../services/api";
import { Expense } from "../types/ExpenseInterface";

interface ExpensesListProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

/**
 * ExpensesList component for displaying and managing the list of expenses.
 * @param {ExpensesListProps} props - Contains expenses array and setExpenses function.
 * @returns JSX Element for ExpensesList.
 */
export function ExpensesList({ expenses, setExpenses }: ExpensesListProps) {
  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
    };
    fetchExpenses();
  }, [setExpenses]);

  /**
   * Deletes an expense by ID and updates the list.
   * @param {number} id - ID of the expense to delete.
   */
  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {expense.description} - ${expense.amount}
          <button
            onClick={() => handleDelete(expense.id!)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
