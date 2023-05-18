// import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
// import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../util/date";
import { useAppSelector } from "../hooks/useRedux";

function RecentExpenses() {
  // const expensesCtx = useContext(ExpensesContext);

  const expenses = useAppSelector((state) => state.expenses.expenses);

  const recentExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date).toISOString();
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (
      expenseDate >= date7DaysAgo.toISOString() &&
      expenseDate <= today.toISOString()
    );
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
}

export default RecentExpenses;
