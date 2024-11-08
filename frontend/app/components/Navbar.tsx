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
    setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const getStoredTheme = () => localStorage.getItem("theme");

  const setStoredTheme = (theme: string) =>
    localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    setStoredTheme(!isDarkMode ? "dark" : "light");
    setTheme(!isDarkMode ? "dark" : "light");
  };

  const setTheme = (theme: string) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          <h3>Expense Tracker</h3>
        </Link>
        <div>
          <Link href="/expenses/create">
            <button className="btn btn-primary btn-sm">Add Expense</button>
          </Link>
          <button
            className="btn btn-outline-secondary btn-sm ms-2"
            onClick={toggleMode}
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
