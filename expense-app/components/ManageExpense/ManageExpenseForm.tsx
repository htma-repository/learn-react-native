import { View, StyleSheet } from "react-native";

import Input from "../UI/Input";

export default function ManageExpenseForm() {
  return (
    <View>
      <Input inputLabel="title" keyboardType="default" maxLength={25} />
      <Input inputLabel="description" keyboardType="default" maxLength={50} />
      <Input inputLabel="amount" keyboardType="decimal-pad" maxLength={15} />
    </View>
  );
}

const styles = StyleSheet.create({});
