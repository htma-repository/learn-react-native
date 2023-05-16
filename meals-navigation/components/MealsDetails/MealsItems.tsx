import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";

import Card from "../UI/Card";
import { colors } from "../../utils/colors";

interface IMealsItems {
  id: string;
  title: string;
  imageUrl: string;
  duration: number;
  complexity: string;
  affordability: string;
  onPress: (mealId: string) => void;
}

const MealsItems = ({
  id,
  title,
  imageUrl,
  affordability,
  complexity,
  duration,
  onPress,
}: IMealsItems) => {
  return (
    <Card style={styles.mealItemContainer}>
      <Pressable
        style={({ pressed }) => [
          pressed && styles.rippleIOS,
          styles.pressContainer,
        ]}
        android_ripple={{ color: colors.green }}
        onPress={onPress.bind(this, id)}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{duration}m</Text>
          <Text style={styles.detailsText}>{complexity.toUpperCase()}</Text>
          <Text style={styles.detailsText}>{affordability.toUpperCase()}</Text>
        </View>
      </Pressable>
    </Card>
  );
};

export default MealsItems;

const styles = StyleSheet.create({
  mealItemContainer: {
    margin: 32,
    backgroundColor: colors.white,
  },
  pressContainer: {
    flex: 1,
    rowGap: 16,
  },
  imageContainer: {
    rowGap: 16,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.black,
  },
  detailsText: {
    fontSize: 14,
    color: colors.green,
    textAlign: "center",
    fontWeight: "500",
  },
  rippleIOS: {
    opacity: Platform.select({ ios: 0.8, android: 0.9 }),
  },
});
