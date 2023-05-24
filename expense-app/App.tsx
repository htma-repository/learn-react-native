import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

// import ExpensesContextProvider from "./store/context/expenses-context";
import ExpensesBottomTabs from "./components/UI/ExpensesBottomTabs";
import ManageExpense from "./screens/ManageExpense";
import { GlobalStyles } from "./constants/styles";
import { store } from "./store/redux/store";
import { RootStackParamList } from "./types/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      {/* <ExpensesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesBottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </ExpensesContextProvider> */}
    </>
  );
}
