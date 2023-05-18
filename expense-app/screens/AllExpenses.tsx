// import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useAppSelector } from "../hooks/useRedux";
// import { ExpensesContext } from "../store/context/expenses-context";

function AllExpenses() {
  // const expensesCtx = useContext(ExpensesContext);
  const expenses = useAppSelector((state) => state.expenses.expenses);

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
