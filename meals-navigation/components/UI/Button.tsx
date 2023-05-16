import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";

import { colors } from "../../utils/colors";

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
        android_ripple={{ color: colors.green }}
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
    borderRadius: 4,
  },
  button: {
    // backgroundColor: Platform.select({
    //   android: colors.pink,
    //   ios: "transparent",
    // }),
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: Platform.select({
      android: colors.black,
      ios: colors.white,
    }),
    fontWeight: "500",
    textAlign: "center",
  },
  rippleIOS: {
    opacity: 0.75,
  },
});

export default Button;
