import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import expensesSlice from "./expensesSlice";
import { ExpenseApi } from "./query/expense";

export const store = configureStore({
  reducer: {
    expenses: expensesSlice,
    // [ExpenseApi.reducerPath]: ExpenseApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(ExpenseApi.middleware),
});

// setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
