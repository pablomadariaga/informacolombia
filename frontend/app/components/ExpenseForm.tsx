"use client";

import { useState } from "react";
import { Expense } from "../types/ExpenseInterface";

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  initialValues?: Expense;
  loading: boolean; // New loading prop to indicate loading status
}

/**
 * ExpenseForm component for adding or editing an expense.
 * @param {ExpenseFormProps} props - Contains onSubmit callback, initialValues, and loading state.
 * @returns JSX Element for ExpenseForm.
 */
export function ExpenseForm({
  onSubmit,
  initialValues,
  loading,
}: ExpenseFormProps) {
  const [amount, setAmount] = useState(initialValues?.amount || 0);
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId || 1);
  const [date, setDate] = useState(initialValues?.date || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );

  /**
   * Handles form submission, calling onSubmit with the expense data.
   * @param {React.FormEvent} e - Form submission event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, categoryId, date, description });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="number"
          className="form-control"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={loading} // Disable input during loading
        />
      </div>
      <div className="mb-3">
        <label htmlFor="categoryId" className="form-label">
          Category ID
        </label>
        <input
          type="number"
          className="form-control"
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          disabled={loading} // Disable input during loading
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={loading} // Disable input during loading
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading} // Disable input during loading
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
