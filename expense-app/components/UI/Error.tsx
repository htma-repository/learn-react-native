import { View, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

interface IErrorProps {
  errorTitle: string;
  errorDescription: string;
}

export default function Error({ errorTitle, errorDescription }: IErrorProps) {
  return (
    <View style={styles.errorContainer}>
      <Text style={[styles.errorTitle, styles.errorText]}>{errorTitle}</Text>
      <Text style={[styles.errorDesc, styles.errorText]}>
        {errorDescription}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary700,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  errorDesc: {
    fontSize: 16,
    fontWeight: "500",
  },
  errorText: {
    color: GlobalStyles.colors.error50,
  },
});
