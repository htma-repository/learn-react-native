import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import WelcomeScreen from "./screens/WelcomeScreen";
import UserScreen from "./screens/UserScreen";

type RootStackParamList = {
  Welcome: undefined;
  User: undefined;
};

// const Drawer = createDrawerNavigator<RootStackParamList>();

const BottomTab = createBottomTabNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* // DRAWER */}
      {/* <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2196F3",
          },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#219",
          drawerActiveBackgroundColor: "#ccc",
          drawerStyle: { backgroundColor: "#fff" },
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            drawerLabel: "Welcome Screen",
            drawerIcon: ({ color, focused, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            drawerLabel: "User Screen",
            drawerIcon: ({ color, focused, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator> */}
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#219",
        }}
      >
        <BottomTab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="User"
          component={UserScreen}
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <MaterialIcons name="person" size={size} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
