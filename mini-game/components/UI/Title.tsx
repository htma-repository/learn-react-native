import { Text, StyleSheet, TextProps, Platform } from "react-native";

import { color } from "../../utils/colors";

interface ITitle extends TextProps {
  children: React.ReactNode | string;
  style?: Object;
}

export default function Title({ children, style }: ITitle) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    // fontWeight: "bold",
    color: color.green,
    textAlign: "center",
    padding: 12,
    // borderWidth: Platform.OS === "ios" ? 0 : 2,
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: color.yellow,
    borderRadius: 4,
    // maxWidth: "80%",
    // width: 300,
  },
});
