import {
  View,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import HomeInput from "../components/Home/HomeInput";

interface IHomeScree {
  onPickedNumber: (pickNumber: number) => void;
}

export default function HomeScreen({ onPickedNumber }: IHomeScree) {
  const { width } = useWindowDimensions();

  const heightDimensions = width < 400 ? 150 : 75;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.homeContainer, { marginTop: heightDimensions }]}>
          <HomeInput onPickedNumber={onPickedNumber} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  homeContainer: {
    paddingHorizontal: 34,
  },
});
