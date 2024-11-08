"use client";

import { useState } from "react";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpensesList } from "../components/ExpensesList";
import { createExpense, getExpenses } from "../services/api";
import { Expense } from "../types/ExpenseInterface";

/**
 * ExpensesPage component for managing expenses.
 * @returns JSX Element for the main ExpensesPage.
 */
export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Handles adding a new expense by calling the createExpense API function.
   * @param {Expense} expense - New expense object to add.
   */
  const handleAddExpense = async (expense: Expense) => {
    setLoading(true); // Set loading to true when the request starts
    try {
      await createExpense(expense);
      const updatedExpenses = await getExpenses(); // Fetch updated expenses
      setExpenses(updatedExpenses); // Update state with new expenses
    } catch (error) {
      console.error("Failed to add expense:", error);
    } finally {
      setLoading(false); // Reset loading status
    }
  };

  return (
    <div className="container">
      <h1>Expenses</h1>
      <ExpenseForm onSubmit={handleAddExpense} loading={loading} />
      <ExpensesList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}
