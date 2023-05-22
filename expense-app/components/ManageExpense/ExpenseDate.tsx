import { View, Text, Pressable, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import { newDateFormat } from "../../util/date";

interface IExpenseDateProps {
  dateInput: Date;
  onChangeDate: () => void;
}

export default function ExpenseDate({
  dateInput,
  onChangeDate,
}: IExpenseDateProps) {
  return (
    <View style={styles.rootDateContainer}>
      <Text style={styles.dateTextLabel}>Date : (yyyy-mm-dd)</Text>
      <Pressable style={styles.dateContainer} onPress={onChangeDate}>
        <Text style={styles.dateText}>
          {newDateFormat(dateInput.toISOString())}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rootDateContainer: {
    rowGap: 12,
  },
  dateContainer: {
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 10,
    borderRadius: 4,
  },
  dateTextLabel: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "500",
    fontSize: 16,
  },
  dateText: {
    color: GlobalStyles.colors.primary700,
    fontWeight: "500",
    fontSize: 16,
  },
});
