import { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import MealItem from "../components/MealDetail/MealItem";
import Button from "../components/UI/Button";
import Meal from "../models/meal";
import { MEALS } from "../data/dummy-data";
import { colors } from "../utils/colors";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";

import type { RootState, AppDispatch } from "../store/store";

import {
  TMealScreenRouteProp,
  TMealScreenNavigationProp,
} from "../types/types";

const MealDetailScreen = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const favoriteMeals = useSelector((state: RootState) => state.favorite);

  const { params } = useRoute<TMealScreenRouteProp>();
  const navigation = useNavigation<TMealScreenNavigationProp>();

  const meal = MEALS.find((mealItem) => {
    return mealItem.id === params.mealId;
  }) as Meal;

  const favButtonHandler = () => {
    if (favoriteMeals.favorite.find((item) => item.id === meal.id)) {
      setIsFavorite(false);
      dispatch(removeFavorite(meal));
      Alert.alert(
        "Successfully Removed",
        `${meal.title} removed from favorites`,
        [
          {
            text: "OK",
            style: "default",
          },
        ]
      );
    } else {
      setIsFavorite(true);
      dispatch(addFavorite(meal));
    }
  };

  useLayoutEffect(() => {
    if (favoriteMeals.favorite.find((item) => item.id === meal.id)) {
      setIsFavorite(true);
    }
  }, [favoriteMeals.favorite]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-outline"}
              size={24}
              color={colors.pink}
            />
          }
          onPress={favButtonHandler}
        />
      ),
    });
  }, [navigation, favButtonHandler]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal?.title,
    });
  }, [navigation, meal]);

  return <MealItem {...meal} />;
};

export default MealDetailScreen;
