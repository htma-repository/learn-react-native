import React from "react";
import { View, Text, StyleSheet } from "react-native";

import DetailItem from "./DetailItem";
import { colors } from "../../utils/colors";

interface IDetailList {
  data: string[];
  detailTitle: string;
}

const DetailList = ({ data, detailTitle }: IDetailList) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{detailTitle}</Text>
      <View style={styles.listContainer}>
        {data.map((item, index) => (
          <DetailItem item={item} key={item + index.toString()} />
        ))}
      </View>
    </View>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    width: "80%",
    alignSelf: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
    margin: 10,
  },
});
