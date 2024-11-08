import axios from "axios";
import { useToast } from "../context/ToastContext";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, // Set a timeout for requests
});

// Interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { showToast } = useToast();
    if (error.response) {
      const status = error.response.status;
      // Map status codes to error messages
      if (status === 400) showToast("Bad Request - Check your data", "danger");
      else if (status === 404) showToast("Resource not found", "danger");
      else if (status === 500)
        showToast("Server error - Please try again later", "danger");
      else showToast("An unexpected error occurred", "danger");
    } else if (error.request) {
      // Network error
      showToast("Network error - Please check your connection", "danger");
    } else {
      showToast("An unexpected error occurred", "danger");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
