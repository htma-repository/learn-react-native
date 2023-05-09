import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";

import { color } from "../../utils/colors";

interface IButton extends PressableProps {
  title: string | React.ReactNode;
  pressStyle?: Object;
  textStyle?: Object;
  onPress: () => void;
}

const Button = ({
  title,
  pressStyle,
  textStyle,
  onPress,
  ...props
}: IButton) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          pressed && styles.rippleIOS,
          styles.button,
          pressStyle,
        ]}
        android_ripple={{ color: color.yellow }}
        {...props}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: "hidden",
    margin: 4,
    borderRadius: 28,
  },
  button: {
    backgroundColor: Platform.select({
      android: color.orange,
      ios: "transparent",
    }),
    paddingVertical: 12,
    paddingHorizontal: 12,
    elevation: 2,
  },
  buttonText: {
    color: Platform.select({
      android: color.darkGray,
      ios: color.orange,
    }),
    textTransform: "uppercase",
    fontFamily: "Inter-SemiBold",
    // fontWeight: "600",
    textAlign: "center",
  },
  rippleIOS: {
    opacity: 0.75,
  },
});

export default Button;
