import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

interface IInputProps extends TextInputProps {
  inputLabel: string;
}

export default function Input({ inputLabel, ...textInputProps }: IInputProps) {
  return (
    <View>
      <Text>{inputLabel}</Text>
      <TextInput {...textInputProps} />
    </View>
  );
}

const styles = StyleSheet.create({});
