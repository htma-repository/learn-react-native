import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";

// import DrawerNavigation from "./components/UI/DrawerNavigation";
import TabNavigation from "./components/UI/TabNavigation";
import { store } from "./store/store";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </Provider>
    </>
  );
}
