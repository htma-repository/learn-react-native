import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IExpenses {
  id?: string;
  description: string;
  amount: number;
  date: string;
}

export type RootStackParamList = {
  ManageExpense: { expenseId: string };
  RecentExpenses: undefined;
  AllExpenses: undefined;
  ExpensesOverview: undefined;
};

export type TManageExpenseScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ManageExpense"
>;

export type TManageExpenseScreenRouteProp = RouteProp<
  RootStackParamList,
  "ManageExpense"
>;
