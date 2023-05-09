import { View, Text, StyleSheet } from "react-native";

import { color } from "../../utils/colors";

interface ILogNumberGuess {
  numberGuess: number;
  logNumber: number;
}

export default function LogNumberGuess({
  numberGuess,
  logNumber,
}: ILogNumberGuess) {
  // const { width } = useWindowDimensions();

  return (
    <View style={styles.logContainer}>
      <Text>#{numberGuess}</Text>
      <Text>Opponent's Guess: {logNumber}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderColor: color.green,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: color.orange,
    maxWidth: "100%",
    width: "100%",
  },
});
