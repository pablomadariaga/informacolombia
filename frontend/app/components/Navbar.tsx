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
    if (typeof window !== "undefined") {
      const preferredTheme = getPreferredTheme();
      setIsDarkMode(preferredTheme === "dark");
      setTheme(preferredTheme);

      // Add listener for system color scheme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== "light" && storedTheme !== "dark") {
          setTheme(getPreferredTheme());
        }
      };
      mediaQuery.addEventListener("change", handleChange);

      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const getStoredTheme = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme");
    }
    return null;
  };

  const setStoredTheme = (theme: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  };

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
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    setStoredTheme(newTheme);
    setTheme(newTheme);
  };

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
