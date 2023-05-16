import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TDetailScreenNavigationProp } from "../types/types";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MealsItems from "../components/MealsDetails/MealsItems";
import { colors } from "../utils/colors";

const FavoriteScreen = () => {
  const navigation = useNavigation<TDetailScreenNavigationProp>();

  const favoriteMeals = useSelector((state: RootState) => state.favorite);

  const mealDetailNavigationHandler = (mealId: string) => {
    navigation.navigate("Meal_Detail", { mealId });
  };

  return (
    <View style={styles.favContainer}>
      {favoriteMeals.favorite.length === 0 ? (
        <View style={styles.textContainer}>
          <Text style={styles.emptyText}>Favorites is Empty</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteMeals.favorite}
          renderItem={({ item }) => (
            <MealsItems {...item} onPress={mealDetailNavigationHandler} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  favContainer: {
    flex: 1,
    backgroundColor: colors.black,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.pink,
  },
});
