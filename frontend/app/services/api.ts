import axiosInstance from "./axiosInstance";
import { Expense } from "../types/ExpenseInterface";
import { Category } from "../types/CategoryInterface";

/**
 * Fetches all expenses from the API.
 * @returns {Promise<Expense[]>} - A promise that resolves to an array of Expense objects.
 */
export const getExpenses = async (): Promise<Expense[]> => {
  const response = await axiosInstance.get("/expenses");
  return response.data;
};

/**
 * Creates a new expense in the API.
 * @param {Expense} expense - The expense data to create.
 * @returns {Promise<Expense>} - A promise that resolves to the created Expense object.
 */
export const createExpense = async (expense: Expense): Promise<Expense> => {
  const response = await axiosInstance.post("/expenses", expense);
  return response.data;
};

/**
 * Updates an existing expense in the API.
 * @param {number} id - The ID of the expense to update.
 * @param {Expense} expense - The updated expense data.
 * @returns {Promise<Expense>} - A promise that resolves to the updated Expense object.
 */
export const updateExpense = async (id: number, expense: Expense): Promise<Expense> => {
  const response = await axiosInstance.put(`/expenses/${id}`, expense);
  return response.data;
};

/**
 * Deletes an expense from the API.
 * @param {number} id - The ID of the expense to delete.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 */
export const deleteExpense = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/expenses/${id}`);
};

/**
 * Fetches all categories from the API.
 * @returns {Promise<Category[]>} - A promise that resolves to an array of Category objects.
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};
