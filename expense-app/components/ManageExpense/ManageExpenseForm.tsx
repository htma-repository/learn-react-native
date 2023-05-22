import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";

import Button from "../UI/Button";
import Input from "../UI/Input";
import ExpenseDate from "./ExpenseDate";
import { IDummyExpenses } from "../../types/types";
import { useAppSelector } from "../../hooks/useRedux";
import { GlobalStyles } from "../../constants/styles";

interface IManageExpenseFormProps {
  onCancel: () => void;
  onSubmit: (expenseData: IDummyExpenses) => void;
  isEditing: boolean;
}

export default function ManageExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
}: IManageExpenseFormProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [dateInput, setDateInput] = useState<Date>(new Date());
  const [descInput, setDescInput] = useState<string>("");
  const [amountInput, setAmountInput] = useState<string>("");

  // const [expenseInput, setExpenseInput] = useState<{
  //   amount: { value: string; isValid: boolean };
  //   date: { value: Date; isValid: boolean };
  //   description: { value: string; isValid: boolean };
  // }>({
  //   amount: { value: "", isValid: true },
  //   date: { value: new Date(), isValid: true },
  //   description: { value: "", isValid: true },
  // });

  const editData = useAppSelector((state) => state.expenses.editData);

  useEffect(() => {
    if (isEditing) {
      setDateInput(new Date(editData?.date as string));
      setDescInput(editData?.description as string);
      setAmountInput(editData?.amount.toString() as string);
      // setExpenseInput((prevState) => ({
      //   ...prevState,
      //   date: {
      //     value: new Date(editData?.date as string),
      //     isValid: true,
      //   },
      //   description: { value: editData?.description as string, isValid: true },
      //   amount: { value: editData?.amount.toString() as string, isValid: true },
      // }));
    }
  }, [isEditing, editData]);

  const dateInputHandler = (date: Date) => {
    setDateInput(date);
    setIsDatePickerVisible(false);
  };

  // const expenseInputHandler = (
  //   identifier: string,
  //   textInput: string | Date
  // ) => {
  //   setExpenseInput((prevSate) => ({ ...prevSate, [identifier]: textInput }));
  //   setIsDatePickerVisible(false);
  // };

  const showDatePickerHandler = () => {
    setIsDatePickerVisible(true);
  };

  const cancelDateInputHandler = () => {
    setIsDatePickerVisible(false);
  };

  const descInputHandler = (text: string) => {
    setDescInput(text);
  };

  const amountInputHandler = (text: string) => {
    setAmountInput(text);
  };

  const confirmAddInputHandler = () => {
    const expenseData = {
      amount: Number(amountInput),
      date: dateInput.toISOString(),
      description: descInput,
    };

    // const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    // const dateIsValid = expenseData.date !== "Invalid Date";
    // const descIsValid = expenseData.description.trim().length > 0;

    // if (!amountIsValid || !dateIsValid || !descIsValid) {
    //   // setExpenseInput((prevState) => ({
    //   //   amount: { value: prevState.amount.value, isValid: amountIsValid },
    //   //   date: { value: prevState.date.value, isValid: dateIsValid },
    //   //   description: {
    //   //     value: prevState.description.value,
    //   //     isValid: descIsValid,
    //   //   },
    //   // }));
    //   return;
    // }

    onSubmit(expenseData);
  };

  // const formIsValid =
  //   !expenseInput.amount.isValid ||
  //   !expenseInput.date.isValid ||
  //   !expenseInput.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.titleText}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          inputLabel="Amount"
          keyboardType="decimal-pad"
          maxLength={15}
          onChangeText={amountInputHandler}
          value={amountInput}
          style={styles.inputRowChildren}
        />
        <View style={[styles.inputRowChildren, styles.dateInputContainer]}>
          <ExpenseDate
            dateInput={dateInput}
            onChangeDate={showDatePickerHandler}
          />
          <DatePicker
            modal
            open={isDatePickerVisible}
            date={dateInput}
            mode="date"
            onConfirm={dateInputHandler}
            onCancel={cancelDateInputHandler}
          />
        </View>
      </View>
      <Input
        inputLabel="Description"
        keyboardType="default"
        maxLength={150}
        onChangeText={descInputHandler}
        value={descInput}
        multiline
        // numberOfLines={3}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmAddInputHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    rowGap: 16,
    // marginTop: 40,
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
});
