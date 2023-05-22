import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import { GlobalStyles } from "../../constants/styles";

interface IInputProps extends TextInputProps {
  inputLabel: string;
  style?: StyleProp<ViewStyle>;
}

export default function Input({
  inputLabel,
  style,
  ...textInputProps
}: IInputProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.labelText}>{inputLabel} :</Text>
      <TextInput
        {...textInputProps}
        style={[
          styles.textInput,
          textInputProps.multiline && styles.inputMultiLine,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    rowGap: 12,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "500",
    color: GlobalStyles.colors.primary50,
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary50,
    color: GlobalStyles.colors.primary800,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 125,
    textAlignVertical: "top",
  },
});
