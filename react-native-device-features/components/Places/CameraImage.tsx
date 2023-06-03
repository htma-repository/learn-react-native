import { useState } from "react";
import { View, Text, Alert, StyleSheet, Image } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import OutlineButton from "../ui/OutlineButton";
import { Colors } from "../../constants/colors";

interface ICameraImageProps {
  onSelectedImage: (image: string) => void;
}

export default function CameraImage({ onSelectedImage }: ICameraImageProps) {
  const [pickedImage, setPickedImage] = useState<string>("");
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();

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

    setPickedImage(images[0]);
    onSelectedImage(images[0]);
  }

  let imageViewer = <Text style={styles.emptyText}>No Image picked yet</Text>;

  if (pickedImage.length > 0) {
    imageViewer = (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: pickedImage }} />
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
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
    rowGap: 16,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    rowGap: 12,
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
