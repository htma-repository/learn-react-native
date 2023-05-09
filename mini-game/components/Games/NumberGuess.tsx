import { View, Text, StyleSheet } from "react-native";

import { color } from "../../utils/colors";

interface INumberGuess {
  children: React.ReactNode | string;
}

export default function NumberGuess({ children }: INumberGuess) {
  return (
    <View style={styles.guessContainer}>
      <Text style={styles.guessText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  guessContainer: {
    marginVertical: 24,
    padding: 16,
    borderWidth: 2,
    borderColor: color.green,
    borderRadius: 4,
  },
  guessText: {
    fontSize: 34,
    fontFamily: "Inter-Bold",
    // fontWeight: "bold",
    color: color.green,
    textAlign: "center",
  },
});
