import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CameraImage from "./CameraImage";
import Input from "../ui/Input";

export default function PlaceForm() {
  const [titleInput, setTitleInput] = useState<string>("");

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
