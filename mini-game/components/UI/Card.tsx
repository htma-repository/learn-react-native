import { View, StyleSheet } from "react-native";

import { color } from "../../utils/colors";

interface ICard {
  children: React.ReactNode;
  style?: Object;
}

export default function Card({ children, style }: ICard) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.green,
    padding: 28,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 1.5,
  },
});
