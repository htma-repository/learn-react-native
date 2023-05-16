import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

import { RootStackParamList } from "../../types/types";
import CategoryScreen from "../../screen/Category.screen";
import FavoriteScreen from "../../screen/Favorite.screen";
import { colors } from "../../utils/colors";

const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.green },
        headerTintColor: colors.white,
        sceneContainerStyle: { backgroundColor: colors.black },
        drawerStyle: { backgroundColor: colors.white },
        drawerActiveTintColor: colors.green,
        drawerActiveBackgroundColor: colors.pink,
      }}
    >
      <Drawer.Screen
        name="Meals_Category"
        component={CategoryScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Meals_Favorites"
        component={FavoriteScreen}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
