import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface IButton extends PressableProps {
  title: string;
  style?: Object;
  onPress: () => void;
}

const Button = ({ title, style, onPress }: IButton) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "600",
  },
});

export default Button;
