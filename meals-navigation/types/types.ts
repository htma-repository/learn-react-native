import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Meal from "../models/meal";

export type RootStackParamList = {
  Meals_Category: undefined;
  Meals_Favorites: undefined;
  Drawer_Navigation: undefined;
  Tab_Navigation: undefined;
  Stack_Navigation: undefined;
  Meals_Detail: { categoryId: string };
  Meal_Detail: { mealId: string };
};

// export type TCategoryScreen = NativeStackScreenProps<
//   RootStackParamList,
//   "Meals_Category"
// >;

export type TCategoryScreenRouteProp = RouteProp<
  RootStackParamList,
  "Meals_Category"
>;

export type TCategoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meals_Category"
>;

// export type TDetailScreen = NativeStackScreenProps<
//   RootStackParamList,
//   "Meals_Detail"
// >;

export type TDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "Meals_Detail"
>;

export type TDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meals_Detail"
>;

export type TMealScreenRouteProp = RouteProp<RootStackParamList, "Meal_Detail">;

export type TMealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meal_Detail"
>;

export interface IFavorite {
  favorite: Meal[];
}

// type categoryScreenNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<TabParamList, "Profile">,
//   StackNavigationProp<StackParamList>
// >;
