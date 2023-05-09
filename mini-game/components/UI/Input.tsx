import React from "react";
import {
  TextInput,
  TextInputAndroidProps,
  TextInputIOSProps,
  TextInputProps,
  View,
  StyleSheet,
} from "react-native";

import { color } from "../../utils/colors";

interface IInputProps
  extends TextInputProps,
    TextInputAndroidProps,
    TextInputIOSProps {
  value: string;
  placeholder?: string;
  style?: Object;
  onChangeText: (text: string) => void;
}

export default function Input({
  value,
  onChangeText,
  placeholder,
  style,
  ...props
}: IInputProps) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.textInput, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontFamily: "Inter-Regular",
    padding: 8,
    color: "#000",
    borderBottomColor: color.orange,
    borderBottomWidth: 3,
  },
});
