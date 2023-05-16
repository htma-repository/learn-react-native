import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import StackNavigation from "./StackNavigation";
import FavoriteScreen from "../../screen/Favorite.screen";
import { colors } from "../../utils/colors";

import { RootStackParamList } from "../../types/types";

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green },
        headerTintColor: colors.white,
        tabBarStyle: { backgroundColor: colors.white },
        tabBarActiveTintColor: colors.green,
        // sceneContainerStyle: { backgroundColor: colors.black },
        // tabBarActiveBackgroundColor: "#ccc",
      }}
    >
      <Tab.Screen
        name="Stack_Navigation"
        component={StackNavigation}
        options={{
          headerShown: false,
          title: "All Categories",
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Meals_Favorites"
        component={FavoriteScreen}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
