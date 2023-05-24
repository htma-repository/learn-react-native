import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IExpenses } from "../../types/types";
import {
  getExpenses,
  postExpenses,
  deleteExpenses,
  putExpenses,
} from "../../util/api";

interface ExpensesState {
  expenses: IExpenses[];
  editData: IExpenses | null;
  loading: boolean;
  error: boolean;
}

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async () => {
    const response = await getExpenses();
    return response.data;
  }
);

export const addExpenses = createAsyncThunk(
  "expenses/addExpenses",
  async (expense: IExpenses) => {
    const response = await postExpenses(expense);
    return response.data;
  }
);

export const removeExpenses = createAsyncThunk(
  "expenses/removeExpenses",
  async (id: string) => {
    const response = await deleteExpenses(id);
    return response.data;
  }
);

export const updateExpenses = createAsyncThunk(
  "expenses/updateExpenses",
  async (updatedExpenses: { id: string; expense: IExpenses }) => {
    const response = await putExpenses(
      updatedExpenses.id,
      updatedExpenses.expense
    );
    return response.data;
  }
);

const initialState: ExpensesState = {
  expenses: [],
  editData: null,
  loading: false,
  error: false,
};

export const expensesSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<IExpenses>) => {
      const id = `${performance.now()}${Math.random()
        .toString(36)
        .substring(2, 10)}`;
      state.expenses.unshift({ ...action.payload, id });
    },
    deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
    updateExpense: (state, action: PayloadAction<IExpenses>) => {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state.expenses[updatableExpenseIndex];
      state.expenses[updatableExpenseIndex] = {
        ...updatableExpense,
        ...action.payload,
      };
    },
    addExpenseToEdit: (state, action: PayloadAction<IExpenses>) => {
      state.editData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
      state.error = false;
    }),
      builder.addCase(fetchExpenses.fulfilled, (state, action) => {
        const expensesData: IExpenses[] = [];
        for (const key in action.payload) {
          const expense: IExpenses = {
            id: key,
            amount: action.payload[key].amount,
            date: action.payload[key].date,
            description: action.payload[key].description,
          };

          expensesData.push(expense);
        }
        state.loading = false;
        state.expenses = expensesData.reverse();
      }),
      builder.addCase(fetchExpenses.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
      builder.addCase(addExpenses.pending, (state) => {
        state.loading = true;
        state.error = false;
      }),
      builder.addCase(addExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses[0].id = action.payload.name;
        console.log("action.payload addExpenses", action.payload);
      }),
      builder.addCase(addExpenses.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
      builder.addCase(removeExpenses.fulfilled, (state, action) => {});
    builder.addCase(updateExpenses.fulfilled, (state, action) => {
      console.log("action.payload updateExpenses", action.payload);
    });
  },
});

export const { addExpense, deleteExpense, updateExpense, addExpenseToEdit } =
  expensesSlice.actions;

export default expensesSlice.reducer;
