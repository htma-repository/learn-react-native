import { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsItems from "../components/MealsDetails/MealsItems";

import {
  TDetailScreenRouteProp,
  TDetailScreenNavigationProp,
} from "../types/types";

const MealsDetailScreen = () => {
  /* `const { params } = useRoute<TDetailScreenRouteProp>();` is using the `useRoute` hook from
`@react-navigation/native` to get the route object for the current screen. It is then destructuring
the `params` property from the route object, which contains any parameters that were passed to the
screen when it was navigated to. The `TDetailScreenRouteProp` type is used to define the expected
shape of the route object's parameters. */
  const { params } = useRoute<TDetailScreenRouteProp>();

  /* `const navigation = useNavigation<TDetailScreenNavigationProp>();` is using the `useNavigation` hook
from `@react-navigation/native` to get the navigation object for the current screen. The
`TDetailScreenNavigationProp` type is used to define the expected shape of the navigation object's
parameters and methods. This allows for type checking and auto-completion when using the navigation
object to navigate between screens or set options for the current screen. */
  const navigation = useNavigation<TDetailScreenNavigationProp>();

  /* `const categoryId = params.categoryId;` is extracting the `categoryId` parameter from the `params`
object that was passed to the screen when it was navigated to. This parameter is used to filter the
`MEALS` array and display only the meals that belong to the selected category. */
  const categoryId = params.categoryId;

  // Another approach to set the title
  /* `useLayoutEffect` is a hook from React that is similar to `useEffect`, but it runs synchronously
after all DOM mutations. In this code, it is used to set the title of the screen based on the
selected category. */
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (categoryItem) => categoryItem.id === categoryId
    )?.title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  /* `const meal = MEALS.filter((mealItem) => mealItem.categoryIds.indexOf(categoryId) >= 0);` is
filtering the `MEALS` array to only include the meals that belong to the selected category. It does
this by using the `filter` method to create a new array that only includes the elements that pass
the test specified in the callback function. The callback function checks if the `categoryIds`
property of each `mealItem` includes the `categoryId` passed to the screen as a parameter. If it
does, the `indexOf` method will return a value greater than or equal to 0, and the `mealItem` will
be included in the new `meal` array. */
  const meal = MEALS.filter(
    (mealItem) => mealItem.categoryIds.indexOf(categoryId) >= 0
  );

  const mealDetailNavigationHandler = (mealId: string) => {
    navigation.navigate("Meal_Detail", { mealId });
  };

  return (
    <FlatList
      data={meal}
      renderItem={({ item }) => (
        <MealsItems {...item} onPress={mealDetailNavigationHandler} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MealsDetailScreen;
