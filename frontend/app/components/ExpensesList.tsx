"use client";

import { useEffect, useState } from "react";
import { deleteExpense, getExpenses } from "../services/api";
import { Expense } from "../types/ExpenseInterface";
import { useToast } from "../context/ToastContext";
import { useLoading } from "../context/LoadingContext";

interface ExpensesListProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

/**
 * ExpensesList component for displaying and managing the list of expenses in a table.
 * @param {ExpensesListProps} props - Contains expenses array and setExpenses function.
 * @returns JSX Element for ExpensesList.
 */
export function ExpensesList({ expenses, setExpenses }: ExpensesListProps) {
  const { showToast } = useToast(); // Access toast function from context
  const { setLoading } = useLoading(); // Access loading function from context
  const [hasError, setHasError] = useState(false); // Track if there was an error

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true); // Start loading

      await getExpenses()
        .then((data) => {
          setExpenses(data);
          if (!data.length) {
            showToast("No expense record found", "info");
          }
          setHasError(false); // Reset error state if successful
        })
        .catch(() => {
          if (!hasError) {
            showToast(
              "Error loading expenses. Please try again later.",
              "danger"
            );
            setHasError(true); // Set error state to avoid repeated toasts
          }
        })
        .finally(() => setLoading(false)); // Stop loading
    };

    if (!hasError) {
      // Only attempt to fetch if there's no error
      fetchExpenses();
    }
  }, [setExpenses, setLoading, showToast, hasError]);

  /**
   * Deletes an expense by ID and updates the list.
   * Shows success or error toast messages based on the API response.
   * @param {number} id - ID of the expense to delete.
   */
  const handleDelete = async (id: number) => {
    setLoading(true); // Start loading
    await deleteExpense(id)
      .then(() => {
        setExpenses(expenses.filter((expense) => expense.id !== id));
        showToast("Expense deleted successfully", "success");
      })
      .catch(() => {
        showToast("Error deleting expense", "danger");
      })
      .finally(() => setLoading(false)); // Stop loading
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.category?.name || "No category"}</td>
              <td>${expense.amount}</td>
              <td>{expense.date}</td>
              <td>
                <button
                  onClick={() => handleDelete(expense.id!)}
                  className="btn btn-danger btn-sm rounded-circle"
                  aria-label="Delete"
                >
                  {/* Inline SVG for Bootstrap Trash Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM7.5 5.5a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zM9.5 5.5a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 1 1 0-2h3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0-.5.5V4h12v-.5a.5.5 0 0 0-.5-.5h-11z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
