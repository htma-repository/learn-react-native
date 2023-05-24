import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// import { ExpensesContext } from "../store/context/expenses-context";
import IconButton from "../components/UI/IconButton";
import ManageExpenseForm from "../components/ManageExpense/ManageExpenseForm";
import { GlobalStyles } from "../constants/styles";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  addExpense,
  updateExpense,
  deleteExpense,
  addExpenses,
  removeExpenses,
  updateExpenses,
} from "../store/redux/expensesSlice";
import Loading from "../components/UI/Loading";

import {
  IExpenses,
  TManageExpenseScreenNavigationProp,
  TManageExpenseScreenRouteProp,
} from "../types/types";

function ManageExpense() {
  // const expensesCtx = useContext(ExpensesContext);

  const { loading } = useAppSelector((state) => state.expenses);
  const dispatch = useAppDispatch();
  const route = useRoute<TManageExpenseScreenRouteProp>();
  const navigation = useNavigation<TManageExpenseScreenNavigationProp>();
  // const [postExpense, { isLoading, data }] = useAddExpenseMutation();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    // expensesCtx.deleteExpense(editedExpenseId);
    dispatch(deleteExpense({ id: editedExpenseId }));
    dispatch(removeExpenses(editedExpenseId));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function submitHandler(expenseData: IExpenses) {
    if (isEditing) {
      // expensesCtx.updateExpense(editedExpenseId, {
      //   description: "Test!!!!",
      //   amount: 29.99,
      //   date: new Date("2022-05-20"),
      // });

      dispatch(
        updateExpense({
          ...expenseData,
          id: editedExpenseId,
          date: expenseData.date,
        })
      );

      dispatch(
        updateExpenses({
          id: editedExpenseId,
          expense: expenseData,
        })
      );
    } else {
      dispatch(addExpense(expenseData));
      dispatch(addExpenses(expenseData));

      // expensesCtx.addExpense({
      //   description: "Test",
      //   amount: 19.99,
      //   date: new Date("2022-05-19"),
      // });

      // try {
      //   await postExpense({
      //     ...expenseData,
      //     date: newDateFormat(expenseData.date),
      //   });
      // } catch (error) {
      //   console.error("rejected", error);
      // }
    }
    !loading && navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ManageExpenseForm
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        isEditing={isEditing}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
