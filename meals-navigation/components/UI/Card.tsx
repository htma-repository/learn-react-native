import { View, StyleSheet, Platform, StyleProp, ViewStyle } from "react-native";

interface ICard {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

const Card = ({ children, style }: ICard) => {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    overflow: Platform.select({ android: "hidden", ios: "visible" }),
  },
});
