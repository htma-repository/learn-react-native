import { useEffect } from "react";
import { Text } from "react-native";

// import { ExpensesContext } from "../store/context/expenses-context";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { fetchExpenses } from "../store/redux/expensesSlice";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

function AllExpenses() {
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

  return (
    <>
      {loading && <Loading />}
      {error && (
        <Error
          errorTitle="Error was occurred"
          errorDescription="Failed to view all expenses"
        />
      )}
      {!loading && !error && (
        <ExpensesOutput
          expenses={expenses}
          expensesPeriod="Total"
          fallbackText="No registered expenses found!"
        />
      )}
    </>
  );
}

export default AllExpenses;
