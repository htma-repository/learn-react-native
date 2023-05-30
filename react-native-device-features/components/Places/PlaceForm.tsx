import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import CameraImage from "./CameraImage";
import LocationPicker from "./LocationPicker";
import Input from "../ui/Input";

export default function PlaceForm() {
  const [titleInput, setTitleInput] = useState<string>("");

  console.log({ titleInput });

  function titleInputHandler(text: string) {
    setTitleInput(text);
  }

  return (
    <ScrollView style={styles.formContainer}>
      <Input
        inputLabel="Title"
        invalid={false}
        onChangeText={titleInputHandler}
        style={styles.input}
      />
      <CameraImage />
      <LocationPicker />
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
});
