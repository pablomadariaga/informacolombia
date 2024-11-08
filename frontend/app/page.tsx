"use client";

import { useEffect, useState } from "react";
import { getExpenses } from "./services/api";
import { Expense } from "./types/ExpenseInterface";
import Link from "next/link";

/**
 * HomePage component displaying a table of expenses.
 * Fetches and displays expenses as a table, with options for each expense.
 * @returns JSX.Element - A JSX element representing the main page with an expenses table.
 */
export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  return (
    <div className="container my-4">
      <h1>Expenses</h1>
      <Link href="/expenses/create">
        <button className="btn btn-primary mb-3">Add New Expense</button>
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>${expense.amount}</td>
              <td>{expense.categoryId}</td>{" "}
              {/* Replace with category name if available */}
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
