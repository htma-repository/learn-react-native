import axios from "axios";
import { IExpenses } from "../types/types";

const API = axios.create({
  baseURL:
    "https://react-native-expense-1951d-default-rtdb.asia-southeast1.firebasedatabase.app",
});

export const getExpenses = async () => {
  const result = await API.get("/expenses.json");
  return result;
};

export const postExpenses = async (expenseData: IExpenses) => {
  const result = await API.post("/expenses.json", expenseData);
  return result;
};

export const deleteExpenses = async (id: string) => {
  const result = await API.delete(`/expenses/${id}.json`);
  return result;
};

export const putExpenses = async (id: string, updatedExpense: IExpenses) => {
  const result = await API.put(`/expenses/${id}.json`, updatedExpense);
  return result;
};
