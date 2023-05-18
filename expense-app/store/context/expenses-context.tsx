import React, { createContext, useReducer, useMemo } from "react";

import { DUMMY_EXPENSES } from "../../util/dummy-expenses";
import { IDummyExpenses } from "../../types/types";

interface IExpensesContext {
  expenses: IDummyExpenses[];
  addExpense: (expenseData: IDummyExpenses) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expenseData: IDummyExpenses) => void;
}

interface IExpensesContextProvider {
  children: React.ReactNode;
}

type Action =
  | { type: "ADD"; payload: IDummyExpenses }
  | { type: "UPDATE"; payload: { id: string; data: IDummyExpenses } }
  | { type: "DELETE"; payload: string };

export const ExpensesContext = createContext<IExpensesContext>(
  {} as IExpensesContext
);

const initialState = { expenses: DUMMY_EXPENSES };

function expensesReducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "ADD": {
      const id = new Date().toString() + Math.random().toString();
      return { expenses: [{ ...action.payload, id }, ...state.expenses] };
    }
    case "UPDATE": {
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return { expenses: updatedExpenses };
    }
    case "DELETE":
      return {
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: IExpensesContextProvider) {
  const [expensesState, dispatch] = useReducer(expensesReducer, initialState);

  function addExpense(expenseData: IDummyExpenses) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id: string) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id: string, expenseData: IDummyExpenses) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value = useMemo(
    () => ({
      expenses: expensesState.expenses,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
    }),
    [expensesState.expenses]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
