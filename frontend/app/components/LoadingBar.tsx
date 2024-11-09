"use client";

import { useLoading } from "../context/LoadingContext";
import { useEffect, useState } from "react";

/**
 * LoadingBar component to display a loading bar at the top of the page.
 * The bar appears when loading is true and animates from left to right.
 * @returns JSX.Element - A div element representing the loading bar.
 */
export function LoadingBar() {
  const { loading } = useLoading();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (loading) {
      setWidth(0);
      const interval = setInterval(() => {
        setWidth((prev) => (prev < 100 ? prev + 1 : 100));
      }, 20);
      return () => clearInterval(interval);
    } else {
      setTimeout(() => setWidth(100), 200); // Finish the bar quickly when loading stops

      setTimeout(() => setWidth(0), 500);
    }
  }, [loading]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${width}%`,
        height: "3px",
        backgroundColor: "#3498db",
        transition: "width 0.2s ease-out",
        zIndex: 1000,
      }}
    ></div>
  );
}
