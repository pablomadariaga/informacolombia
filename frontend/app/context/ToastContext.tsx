import { createContext, useContext, useState, ReactNode } from "react";

interface ToastContextProps {
  showToast: (message: string, type: "success" | "danger") => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

/**
 * Custom hook to access the ToastContext.
 * Throws an error if used outside of the ToastProvider.
 * @returns {ToastContextProps} - The context value with showToast function.
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

/**
 * ToastProvider component that provides toast notifications to children components.
 * @param {ReactNode} children - The child components that will have access to the toast functionality.
 * @returns JSX.Element - The provider component with a toast notification.
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "danger">("success");

  /**
   * Displays a toast notification with a specific message and type.
   * @param {string} message - The message to display in the toast.
   * @param {"success" | "danger"} type - The type of toast (either success or danger).
   */
  const showToast = (message: string, type: "success" | "danger") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <div className={`toast align-items-center text-bg-${toastType} border-0 show mt-3`} role="alert">
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => setToastMessage(null)}
            ></button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
