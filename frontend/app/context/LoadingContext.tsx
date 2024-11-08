import { createContext, useContext, useState, ReactNode } from "react";

interface LoadingContextProps {
  setLoading: (isLoading: boolean) => void;
  loading: boolean;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

/**
 * Custom hook to access the LoadingContext.
 * Throws an error if used outside of the LoadingProvider.
 * @returns {LoadingContextProps} - The loading context with setLoading and loading state.
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

/**
 * LoadingProvider component that provides loading state and controls to children components.
 * @param {ReactNode} children - The child components that will have access to the loading functionality.
 * @returns JSX.Element - The provider component that wraps children and manages loading state.
 */
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
