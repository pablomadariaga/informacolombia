"use client";

import { useState, useEffect } from "react";
import { Expense } from "../types/ExpenseInterface";
import { Category } from "../types/CategoryInterface";
import { getCategories } from "../services/api";

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => void;
  initialValues?: Expense;
  loading: boolean;
}

/**
 * ExpenseForm component for creating or editing an expense.
 * @param {ExpenseFormProps} props - Contains onSubmit callback, initialValues for form inputs, and loading status.
 * @returns JSX.Element - A JSX element representing the expense form.
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
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  /**
   * Handles form submission by passing expense data to the onSubmit callback.
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
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="categoryId" className="form-label">
          Category
        </label>
        <select
          className="form-control"
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          disabled={loading}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
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
          disabled={loading}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows={3}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
