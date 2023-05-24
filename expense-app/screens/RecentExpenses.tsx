import { useState, useEffect } from "react";

// import { ExpensesContext } from "../store/context/expenses-context";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { fetchExpenses } from "../store/redux/expensesSlice";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

function RecentExpenses() {
  // const expensesCtx = useContext(ExpensesContext);
  const { expenses, loading, error } = useAppSelector(
    (state) => state.expenses
  );
  const dispatch = useAppDispatch();

  // const [expensesData, setExpensesData] = useState<IExpenses[]>(
  //   [] as IExpenses[]
  // );

  // const { data } = useGetExpenseQuery();

  // useEffect(() => {
  //   for (const key in data) {
  //     const expense = {
  //       id: key,
  //       amount: data[key].amount as number,
  //       date: data[key].date,
  //       description: data[key].description as string,
  //     };

  //     setExpensesData((prevState) => [...prevState, expense]);
  //   }
  // }, [data]);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch, fetchExpenses]);

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
    <>
      {loading && <Loading />}
      {error && (
        <Error
          errorTitle="Error was occurred"
          errorDescription="Failed to view recent expenses"
        />
      )}
      {!loading && !error && (
        <ExpensesOutput
          expenses={recentExpenses}
          expensesPeriod="Last 7 Days"
          fallbackText="No expenses registered for the last 7 days."
        />
      )}
    </>
  );
}

export default RecentExpenses;
