"use client";

import { useState, useEffect } from "react";
import { Expense } from "../types/ExpenseInterface";
import { Category } from "../types/CategoryInterface";
import { getCategories } from "../services/api";
import { useToast } from "../context/ToastContext";
import { useLoading } from "../context/LoadingContext";

interface ExpenseFormProps {
  onSubmit: (expense: Expense) => Promise<void>;
  initialValues?: Expense;
  loading: boolean;
}

/**
 * ExpenseForm component for creating or editing an expense.
 * Provides real-time validation, error messages, and success notifications.
 * @param {ExpenseFormProps} props - Contains onSubmit callback, initial values for form inputs, and loading status.
 * @returns JSX.Element - The form component for managing expenses.
 */
export function ExpenseForm({
  onSubmit,
  initialValues,
  loading,
}: ExpenseFormProps) {
  const { showToast } = useToast();
  const { setLoading } = useLoading();
  const [amount, setAmount] = useState(initialValues?.amount ?? 0);
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? 1);
  const [date, setDate] = useState(initialValues?.date ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false); // New state to track API load status
  const [errors, setErrors] = useState<{ amount?: string; date?: string }>({});

  useEffect(() => {
    if (!categoriesLoaded) {
      setLoading(true); // Start loading
      getCategories()
        .then((data) => {
          setCategories(data);
          setCategoriesLoaded(true); // Mark as loaded
        })
        .catch(() => {
          showToast(
            "Error fetching categories. Please try again later.",
            "danger"
          );
          setCategoriesLoaded(true); // Mark as loaded
        })
        .finally(() => setLoading(false)); // Stop loading
    }
  }, [categoriesLoaded, setLoading, showToast]);

  /**
   * Validates the form fields in real-time and sets error messages.
   * @returns {boolean} - True if validation passes, otherwise false.
   */
  const validateForm = () => {
    const newErrors: { amount?: string; date?: string } = {};
    if (amount < 0)
      newErrors.amount = "Amount must be greater than or equal to zero";
    if (!date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission by validating inputs and calling onSubmit.
   * Displays success or error messages based on API response.
   * @param {React.FormEvent} e - Form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Start loading
    await onSubmit({ amount, categoryId, date, description })
      .then(() => {
        showToast("Expense created successfully", "success");
      })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          if (status === 400)
            showToast("Bad Request - Check your data", "danger");
          else if (status === 404) showToast("Resource not found", "danger");
          else if (status === 500)
            showToast("Server error - Please try again later", "danger");
        } else {
          showToast("An unexpected error occurred", "danger");
        }
      })
      .finally(() => setLoading(false)); // Stop loading
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className={`form-control ${errors.amount ? "is-invalid" : ""}`}
            id="amount"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              if (e.target.value) validateForm();
            }}
            disabled={loading}
            min="0"
          />
          {errors.amount && (
            <div className="invalid-feedback">{errors.amount}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select
            className="form-select"
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
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            id="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (e.target.value) validateForm();
            }}
            disabled={loading}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
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
    </div>
  );
}
