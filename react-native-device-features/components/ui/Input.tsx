import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import { Colors } from "../../constants/colors";

interface IInputProps extends TextInputProps {
  inputLabel: string;
  invalid: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Input({
  inputLabel,
  style,
  invalid,
  ...textInputProps
}: IInputProps) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.labelText, invalid && styles.invalidText]}>
        {inputLabel} :
      </Text>
      <TextInput
        {...textInputProps}
        style={[
          styles.textInput,
          textInputProps.multiline && styles.inputMultiline,
          invalid && styles.invalidForm,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    rowGap: 12,
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primary50,
  },
  textInput: {
    backgroundColor: Colors.primary50,
    color: Colors.primary800,
    padding: 8,
    borderRadius: 4,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 125,
    textAlignVertical: "top",
  },
  invalidText: {
    color: Colors.accent500,
  },
  invalidForm: {
    backgroundColor: Colors.accent500,
  },
});
