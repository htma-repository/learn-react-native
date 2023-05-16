import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import DetailList from "./DetailList";
import { colors } from "../../utils/colors";

interface IMealItem {
  title: string;
  affordability: string;
  complexity: string;
  imageUrl: string;
  duration: number;
  ingredients: string[];
  steps: string[];
  isGlutenFree: boolean;
  isVegan: boolean;
  isVegetarian: boolean;
  isLactoseFree: boolean;
}

const MealItem = ({
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
  ingredients,
  steps,
  isGlutenFree,
  isLactoseFree,
  isVegan,
  isVegetarian,
}: IMealItem) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitleText}>{duration}m</Text>
        <Text style={styles.subTitleText}>{complexity}</Text>
        <Text style={styles.subTitleText}>{affordability}</Text>
      </View>
      <View style={styles.listContainer}>
        <DetailList data={ingredients} detailTitle="Ingredients" />
        <DetailList data={steps} detailTitle="Steps" />
      </View>
    </ScrollView>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  imageContainer: {
    rowGap: 24,
  },
  listContainer: {
    rowGap: 16,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 300,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.green,
  },
});
