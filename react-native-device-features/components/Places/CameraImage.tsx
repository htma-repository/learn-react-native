// import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

// import Button from "../ui/Button";
import OutlineButton from "../ui/OutlineButton";
import { Colors } from "../../constants/colors";

export default function CameraImage() {
  const [pickedImage, setPickedImage] = useState<string[]>([] as string[]);
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
      quality: 0.7,
    });

    const images = camera?.assets?.map((asset) => asset.uri) as string[];

    setPickedImage((prevState) => [...images, ...prevState]);
  }

  let imageViewer = <Text style={styles.emptyText}>No Image picked yet</Text>;

  if (pickedImage.length > 0) {
    imageViewer = (
      <View style={styles.imageContainer}>
        {pickedImage.map((item) => (
          <Image style={styles.image} source={{ uri: item }} key={item} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      {/* <Camera style={styles.cameraContainer} type={cameraType} /> */}
      {imageViewer}
      <OutlineButton onPress={openCameraHandler} iconName="camera">
        Open Camera
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    rowGap: 12,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 250,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent500,
    marginVertical: 16,
  },
});
