import { StyleSheet, Text, View } from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import IconButton from "../components/ui/IconButton";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useAuthStore } from "../store/store";
import { WelcomeScreenNavigationProps } from "../types/types";

function WelcomeScreen() {
  const [messageData, setMessageData] = useState<string>("");
  const { accessToken, unAuthHandler } = useAuthStore((state) => ({
    accessToken: state.accessToken,
    unAuthHandler: state.unAuthHandler,
  }));
  console.log({ accessToken });

  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigation<WelcomeScreenNavigationProps>();

  const logOutHandler = () => {
    unAuthHandler();
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchMessage = async () => {
      const response = await axiosPrivate.get(
        `/message.json?auth=${accessToken}`,
        { signal: controller.signal }
      );
      console.log({ message: response.data });
      isMounted && setMessageData(response.data);
    };

    fetchMessage();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconName="logout"
          size={24}
          color={tintColor as string}
          onPress={logOutHandler}
        >
          LogOut
        </IconButton>
      ),
    });
  }, [navigation, logOutHandler]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{messageData}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
