import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IExpenses } from "../../../types/types";

export const ExpenseApi = createApi({
  reducerPath: "expenseApi",
  tagTypes: ["Expenses"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://react-native-expense-1951d-default-rtdb.asia-southeast1.firebasedatabase.app",
  }),
  endpoints: (builder) => ({
    getExpense: builder.query<IExpenses[] | any, void | string>({
      query: () => "/expenses.json",
    }),
    addExpense: builder.mutation<IExpenses, Partial<IExpenses>>({
      query: (body) => ({
        url: "/expenses.json",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Expenses", id: "LIST" }],
    }),
    updateExpense: builder.mutation<IExpenses, Partial<IExpenses>>({
      query: ({ id, ...rest }) => ({
        url: "/expenses.json",
        method: "PUT",
        body: rest,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          ExpenseApi.util.updateQueryData("getExpense", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Expenses", id: "LIST" }],
    }),
  }),
});
export const {
  useGetExpenseQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} = ExpenseApi;
