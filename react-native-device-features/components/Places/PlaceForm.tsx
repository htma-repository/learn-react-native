import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CameraImage from "./CameraImage";
import LocationPicker from "./LocationPicker";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Colors } from "../../constants/colors";
import { getAddress } from "../../utils/locationApi";
import { useMaps } from "../../store/context/MapContext";

import type { AddPlaceScreenNavigationProp } from "../../types/types";

export default function PlaceForm() {
  const [titleInput, setTitleInput] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const { latitude, longitude, addPlace } = useMaps();
  const navigation = useNavigation<AddPlaceScreenNavigationProp>();

  useEffect(() => {
    async function getLocationAddress() {
      const address = await getAddress({
        latitude: latitude,
        longitude: longitude,
      });
      if (address?.data) {
        setSelectedAddress(address?.data.data[0].label as string);
      }
    }

    getLocationAddress();
  }, [latitude, longitude, getAddress]);

  function titleInputHandler(text: string) {
    setTitleInput(text);
  }

  function selectedImageHandler(image: string) {
    setSelectedImage(image);
  }

  function placeFormSubmitHandler() {
    if (
      !latitude ||
      !longitude ||
      selectedAddress.length === 0 ||
      selectedImage.length === 0 ||
      titleInput.length === 0
    ) {
      Alert.alert("Failed", "Failed send data");
      return;
    }

    addPlace({
      location: { latitude, longitude },
      title: titleInput,
      address: selectedAddress,
      image: selectedImage[0],
    });

    setSelectedAddress("");
    setSelectedImage("");
    setTitleInput("");

    navigation.navigate("AllPlaces");
  }

  return (
    <ScrollView style={styles.formContainer}>
      <Input
        inputLabel="Title"
        invalid={false}
        onChangeText={titleInputHandler}
        value={titleInput}
        style={styles.input}
      />
      <CameraImage onSelectedImage={selectedImageHandler} />
      <LocationPicker />
      <Button style={styles.button} onPress={placeFormSubmitHandler}>
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    backgroundColor: Colors.primary700,
  },
});
