import { View, StyleSheet } from "react-native";

import PlaceForm from "../components/Places/PlaceForm";

export default function AddPlace() {
  return (
    <View style={styles.container}>
      <PlaceForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
