import { useState, useEffect, useRef } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const notificationResponse = useRef<Notifications.Subscription>();

  useEffect(() => {
    Notifications.getExpoPushTokenAsync({
      projectId: "27fbfd5c-40c0-4d79-b969-a8cffb07bc21",
    }).then((pushTokenData) => {
      console.log(pushTokenData);
    });
  }, []);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("NOTIFICATION ADDED");
        setNotification(notification);
      });

    notificationResponse.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("NOTIFICATION RESPONSE");
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription
      );
      Notifications.removeNotificationSubscription(
        notificationResponse.current as Notifications.Subscription
      );
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          title: {notification?.request.content.title}
        </Text>
        <Text style={styles.text}>
          body: {notification?.request.content.body}
        </Text>
        <Text style={styles.text}>
          data: {notification?.request.content.data.name}
        </Text>
      </View>
      <Button title="Show Notification" onPress={scheduledNotification} />
    </View>
  );
}

const scheduledNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Notification",
      body: "Your new notification",
      data: { name: "hutamatr" },
    },
    trigger: { seconds: 3 },
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    columnGap: 8,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
