import { Text, StyleSheet } from "react-native";

import { color } from "../../utils/colors";

interface IInstructionText {
  children: string;
}

export default function InstructionText({ children }: IInstructionText) {
  return <Text style={styles.textInstruction}>{children}</Text>;
}

const styles = StyleSheet.create({
  textInstruction: {
    fontSize: 26,
    fontFamily: "Inter-SemiBold",
    // fontWeight: "500",
    color: color.orange,
  },
});
