import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";

import Button from "../UI/Button";
import Input from "../UI/Input";
import ExpenseDate from "./ExpenseDate";
import { IExpenses } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { GlobalStyles } from "../../constants/styles";
import Loading from "../UI/Loading";

interface IManageExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: IExpenses) => void;
  isEditing: boolean;
}

interface IExpenseState {
  amount: { value: string; isValid: boolean };
  date: { value: Date; isValid: boolean };
  description: { value: string; isValid: boolean };
}

export default function ManageExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
}: IManageExpenseFormProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [expenseInput, setExpenseInput] = useState<IExpenseState>({
    amount: { value: "", isValid: true },
    date: { value: new Date(), isValid: true },
    description: { value: "", isValid: true },
  });

  const { editData, loading } = useAppSelector((state) => state.expenses);

  useEffect(() => {
    if (isEditing) {
      setExpenseInput((prevState) => ({
        ...prevState,
        date: {
          value: new Date(editData?.date as string),
          isValid: true,
        },
        description: { value: editData?.description as string, isValid: true },
        amount: { value: editData?.amount.toString() as string, isValid: true },
      }));
    }
  }, [isEditing, editData]);

  const expenseInputHandler = (
    identifier: string,
    formInput: string | Date
  ) => {
    setExpenseInput((prevSate) => ({
      ...prevSate,
      [identifier]: {
        value: typeof formInput === "string" ? formInput : new Date(formInput),
        isValid: true,
      },
    }));
    setIsDatePickerVisible(false);
  };

  const showDatePickerHandler = () => {
    setIsDatePickerVisible(true);
  };

  const cancelDateInputHandler = () => {
    setIsDatePickerVisible(false);
  };

  const confirmAddInputHandler = () => {
    const expenseData = {
      amount: Number(expenseInput.amount.value),
      date: expenseInput.date.value.toISOString(),
      description: expenseInput.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date !== "Invalid Date";
    const descIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      setExpenseInput((prevState) => ({
        amount: { ...prevState.amount, isValid: amountIsValid },
        date: { ...prevState.date, isValid: dateIsValid },
        description: { ...prevState.description, isValid: descIsValid },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !expenseInput.amount.isValid ||
    !expenseInput.date.isValid ||
    !expenseInput.description.isValid;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.titleText}>Your Expense</Text>
          <View style={styles.inputRow}>
            <Input
              inputLabel="Amount"
              keyboardType="decimal-pad"
              maxLength={15}
              onChangeText={expenseInputHandler.bind(null, "amount")}
              value={expenseInput.amount.value}
              style={styles.inputRowChildren}
              invalid={!expenseInput.amount.isValid}
            />
            <View style={[styles.inputRowChildren, styles.dateInputContainer]}>
              <ExpenseDate
                dateInput={expenseInput.date.value}
                onChangeDate={showDatePickerHandler}
              />
              <DatePicker
                modal
                open={isDatePickerVisible}
                date={expenseInput.date.value}
                mode="date"
                onConfirm={expenseInputHandler.bind(null, "date")}
                onCancel={cancelDateInputHandler}
              />
            </View>
          </View>
          <Input
            inputLabel="Description"
            keyboardType="default"
            maxLength={150}
            onChangeText={expenseInputHandler.bind(null, "description")}
            value={expenseInput.description.value}
            invalid={!expenseInput.description.isValid}
            multiline
          />
          {formIsInvalid && (
            <Text style={styles.invalidText}>Please Input Correctly!</Text>
          )}
          <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>
              Cancel
            </Button>
            <Button style={styles.button} onPress={confirmAddInputHandler}>
              {isEditing ? "Update" : "Add"}
            </Button>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    rowGap: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 8,
  },
  inputRowChildren: {
    flex: 1,
  },
  dateInputContainer: {
    rowGap: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 24,
    textAlign: "center",
    color: GlobalStyles.colors.primary50,
  },
  invalidText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 8,
  },
});
