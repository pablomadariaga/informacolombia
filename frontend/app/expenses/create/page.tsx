"use client";

import { useState } from "react";
import { ExpenseForm } from "../../components/ExpenseForm";
import { createExpense } from "../../services/api";
import { useRouter } from "next/navigation";
import { Expense } from "@/app/types/ExpenseInterface";

/**
 * CreateExpensePage component for adding a new expense.
 * Displays a form for creating a new expense and redirects to the home page after submission.
 * @returns JSX.Element - A JSX element representing the create expense page.
 */
export default function CreateExpensePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /**
   * Handles the form submission by creating a new expense
   * and navigating back to the home page.
   * @param {Expense} expense - New expense data to submit.
   */
  const handleAddExpense = async (expense: Expense) => {
    setLoading(true);
    try {
      await createExpense(expense);
      router.push("/"); // Redirect to home page after creation
    } catch (error) {
      console.error("Failed to create expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h1>Create Expense</h1>
      <ExpenseForm onSubmit={handleAddExpense} loading={loading} />
    </div>
  );
}
