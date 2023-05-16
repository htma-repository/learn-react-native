import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { colors } from "../../utils/colors";
import MealsDetailScreen from "../../screen/MealsDetail.screen";
import MealDetailScreen from "../../screen/MealDetail.screen";
import CategoryScreen from "../../screen/Category.screen";

import { RootStackParamList } from "../../types/types";

/* `const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();` is creating a
stack navigator using the `createNativeStackNavigator` function from the
`@react-navigation/native-stack` library. The `RootStackParamList` type is passed as a generic
parameter to define the types of the route parameters for the navigator. The `Navigator` and
`Screen` components are destructured from the returned object and used to define the navigation
stack and individual screens respectively. */
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigation = () => {
  return (
    <>
      {/* <SafeAreaView style={[styles.rootContainer, styles.androidSafeArea]}> */}
      <Stack.Navigator
        /* `screenOptions` is a prop of the `Navigator` component from the `@react-navigation/native-stack` library. It is used to set the default options for all screens in the navigator. In this case, it is setting the background color of the header to green, the text color of the header to white, and the background color of the content to black. These options can be overridden for individual screens by setting the `options` prop on the `Screen` component. */
        screenOptions={{
          headerStyle: { backgroundColor: colors.green },
          headerTintColor: colors.white,
          contentStyle: { backgroundColor: colors.black },
        }}
        // initialRouteName="Drawer_Navigation"
      >
        <Stack.Screen
          name="Meals_Category"
          component={CategoryScreen}
          options={{
            title: "All Categories",
          }}
        />
        <Stack.Screen
          name="Meals_Detail"
          component={MealsDetailScreen}
          // setting title based on categoryId
          // options={({ route }) => ({ title: route.params.categoryId })}
        />
        <Stack.Screen name="Meal_Detail" component={MealDetailScreen} />
      </Stack.Navigator>
      {/* </SafeAreaView> */}
    </>
  );
};

export default StackNavigation;
