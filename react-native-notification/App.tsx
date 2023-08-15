import { useState, useEffect, useRef } from "react";
import { Button, View, StyleSheet, Text, Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId:
          Constants.expoConfig?.extra?.eas.projectId ||
          "27fbfd5c-40c0-4d79-b969-a8cffb07bc21",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const scheduledLocalNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "New Notification",
      body: "Your new notification from hutamatr",
      data: { name: "hutamatr" },
    },
    trigger: { seconds: 3 },
  });
};

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const notificationResponse = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    Notifications.getExpoPushTokenAsync({
      projectId:
        Constants.expoConfig?.extra?.eas.projectId ||
        "27fbfd5c-40c0-4d79-b969-a8cffb07bc21",
    }).then((pushTokenData) => {
      console.log(pushTokenData);
    });

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token as string)
    );

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

  const sendPushNotificationHandler = async () => {
    if (Device.isDevice) {
      await sendPushNotification(expoPushToken);
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>expo push token: {expoPushToken}</Text>
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
      <View style={styles.buttonContainer}>
        <Button
          title="Send Push Notification"
          onPress={sendPushNotificationHandler}
        />
        <Button
          title="Send Local Notification"
          onPress={scheduledLocalNotification}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 24,
  },
  textContainer: {
    rowGap: 8,
    justifyContent: "center",
    marginHorizontal: 24,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    rowGap: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
