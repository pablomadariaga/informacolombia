import axios from "axios";
import { Expense } from "../types/ExpenseInterface";
import { Category } from "../types/CategoryInterface";

// API base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetch all expenses from the API.
 * @returns {Promise<Expense[]>} Array of Expense objects.
 */
export const getExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(`${BASE_URL}/expenses`);
  return response.data;
};

/**
 * Create a new expense in the API.
 * @param {Expense} expense - Expense object to be created.
 * @returns {Promise<Expense>} The created Expense object.
 */
export const createExpense = async (expense: Expense): Promise<Expense> => {
  const response = await axios.post(`${BASE_URL}/expenses`, expense);
  return response.data;
};

/**
 * Update an existing expense by ID.
 * @param {number} id - ID of the expense to be updated.
 * @param {Expense} expense - Expense object with updated data.
 * @returns {Promise<Expense>} The updated Expense object.
 */
export const updateExpense = async (
  id: number,
  expense: Expense
): Promise<Expense> => {
  const response = await axios.put(`${BASE_URL}/expenses/${id}`, expense);
  return response.data;
};

/**
 * Delete an expense by ID.
 * @param {number} id - ID of the expense to be deleted.
 * @returns {Promise<void>} Resolves when deletion is complete.
 */
export const deleteExpense = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/expenses/${id}`);
};

/**
 * Fetch all categories from the API.
 * @returns {Promise<Category[]>} Array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data;
};
