import { FlatList } from "react-native";

import ExpenseItem from "./ExpenseItem";

import { IDummyExpenses } from "../../types/types";

interface IExpensesListProps {
  expenses: IDummyExpenses[];
}

function ExpensesList({ expenses }: IExpensesListProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem {...item} />}
      keyExtractor={(item) => item.id as string}
    />
  );
}

export default ExpensesList;
