import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

interface IErrorOverlayProps {
  titleText: string;
  descText: string;
}

export default function ErrorOverlay({
  titleText,
  descText,
}: IErrorOverlayProps) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.errorTitle}>{titleText}</Text>
      <Text style={styles.errorDesc}>{descText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    rowGap: 8,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.accent500,
  },
  errorDesc: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.gray700,
  },
});
