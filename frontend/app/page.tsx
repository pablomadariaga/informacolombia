"use client";

import { useState } from "react";
import Link from "next/link";
import { Expense } from "./types/ExpenseInterface";
import { ExpensesList } from "./components/ExpensesList";

/**
 * HomePage component displaying a table of expenses.
 * Renders the ExpensesList component and provides a link to add new expenses.
 * @returns JSX.Element - A JSX element representing the main page with an expenses table.
 */
export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Expenses</h4>
        <Link href="/expenses/create">
          <button className="btn btn-primary mb-3 btn-sm">
            Add New Expense
          </button>
        </Link>
      </div>
      {/* Render the ExpensesList component */}
      <ExpensesList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}
