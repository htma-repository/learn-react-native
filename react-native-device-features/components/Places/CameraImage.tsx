import { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
// import { Camera, CameraType } from "expo-camera";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import Button from "../ui/Button";

export default function CameraImage() {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();

  // const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionStatus?.status === PermissionStatus.UNDETERMINED) {
      const result = await requestPermission();
      return result.granted;
    }

    if (cameraPermissionStatus?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Sufficient Permission",
        "You need grant camera permission to use this app"
      );

      return false;
    }

    return true;
  }

  // if (!permission) {
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   return (
  //     <View style={styles.cameraContainer}>
  //       <Text style={{ textAlign: "center" }}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission}>grant permission</Button>
  //     </View>
  //   );
  // }

  // function cameraTypeToggle() {
  //   setCameraType((current) =>
  //     current === CameraType.back ? CameraType.front : CameraType.back
  //   );
  // }

  async function openCameraHandler() {
    const permission = await verifyPermission();
    if (!permission) {
      return;
    }
    const camera = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      allowsMultipleSelection: true,
      quality: 0.5,
    });

    console.log({ camera });
  }

  return (
    <View style={styles.cameraContainer}>
      {/* <Camera style={styles.cameraContainer} type={cameraType} /> */}
      <Button onPress={openCameraHandler}>Open Camera</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
});
