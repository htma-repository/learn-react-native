import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import IconButton from "../components/UI/IconButton";
import ManageExpenseForm from "../components/ManageExpense/ManageExpenseForm";
import { GlobalStyles } from "../constants/styles";
import { newDateFormat } from "../util/date";
// import { ExpensesContext } from "../store/context/expenses-context";
import { useAppDispatch } from "../hooks/useRedux";
import {
  addExpense,
  updateExpense,
  deleteExpense,
} from "../store/redux/expensesSlice";
import {
  IDummyExpenses,
  TManageExpenseScreenNavigationProp,
  TManageExpenseScreenRouteProp,
} from "../types/types";

function ManageExpense() {
  // const expensesCtx = useContext(ExpensesContext);

  const dispatch = useAppDispatch();
  const route = useRoute<TManageExpenseScreenRouteProp>();
  const navigation = useNavigation<TManageExpenseScreenNavigationProp>();

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
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function submitHandler(expenseData: IDummyExpenses) {
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
          date: newDateFormat(expenseData.date),
        })
      );
    } else {
      // expensesCtx.addExpense({
      //   description: "Test",
      //   amount: 19.99,
      //   date: new Date("2022-05-19"),
      // });
      dispatch(
        addExpense({
          ...expenseData,
          date: newDateFormat(expenseData.date),
        })
      );
    }
    navigation.goBack();
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
