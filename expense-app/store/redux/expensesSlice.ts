import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IDummyExpenses } from "../../types/types";
import { DUMMY_EXPENSES } from "../../util/dummy-expenses";

interface ExpensesState {
  expenses: IDummyExpenses[];
}

const initialState: ExpensesState = {
  expenses: DUMMY_EXPENSES,
};

export const expensesSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<IDummyExpenses>) => {
      const id = new Date().toString() + Math.random().toString();
      state.expenses.unshift({ ...action.payload, id });
    },
    deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
    updateExpense: (state, action: PayloadAction<IDummyExpenses>) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state.expenses[updatableExpenseIndex];
      state.expenses[updatableExpenseIndex] = {
        ...updatableExpense,
        ...action.payload,
      };
    },
  },
});

export const { addExpense, deleteExpense, updateExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;
