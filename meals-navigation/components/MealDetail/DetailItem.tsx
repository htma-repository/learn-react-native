import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../../utils/colors";

const DetailItem = ({ item }: { item: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.DetailItemText}>{item}</Text>
    </View>
  );
};

export default DetailItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pink,
    margin: 4,
    padding: 8,
    borderRadius: 6,
  },
  DetailItemText: {
    color: colors.black,
    fontSize: 16,
    textAlign: "center",
  },
});
