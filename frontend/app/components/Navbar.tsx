"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Navbar component for toggling between light and dark modes.
 * @returns JSX.Element - A JSX element representing the Navbar with a toggle button.
 */
export function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          Expense Tracker
        </Link>
        <Link href="/expenses/create">
          <button className="btn btn-primary ms-3">Add Expense</button>
        </Link>
        <button className="btn btn-outline-secondary" onClick={toggleMode}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
