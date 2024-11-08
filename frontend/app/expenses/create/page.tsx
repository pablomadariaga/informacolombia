"use client";

import { useState } from "react";
import { ExpenseForm } from "../../components/ExpenseForm";
import { createExpense } from "../../services/api";
import { useRouter } from "next/navigation";
import { Expense } from "@/app/types/ExpenseInterface";
import Link from "next/link";

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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Expenses</h4>
        <Link href="/">
          <button className="btn btn-primary mb-3 btn-sm">
            Add New Expense
          </button>
        </Link>
      </div>
      <ExpenseForm onSubmit={handleAddExpense} loading={loading} />
    </div>
  );
}
