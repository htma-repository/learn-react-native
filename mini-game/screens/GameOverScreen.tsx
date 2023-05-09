import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import Title from "../components/UI/Title";
import Button from "../components/UI/Button";
import { color } from "../utils/colors";

interface IGameOverScreen {
  maxGuesses: number;
  pickedNumber: number;
  onSetPickedNumber: (pickedNumber: number | null) => void;
  onSetGameOver: (isGameOver: boolean) => void;
  onMaxGuesses: React.Dispatch<React.SetStateAction<number>>;
}

const deviceWidth = Dimensions.get("window").width;

export default function GameOverScreen({
  maxGuesses,
  pickedNumber,
  onSetPickedNumber,
  onSetGameOver,
  onMaxGuesses,
}: IGameOverScreen) {
  const { width, height } = useWindowDimensions();

  const newGameHandler = () => {
    onSetPickedNumber(null);
    onSetGameOver(false);
    onMaxGuesses(0);
  };

  const imageSize = height < 380 ? 100 : 200;
  const marginY = width < 380 ? 30 : 50;
  const rowGap = width < 380 ? 10 : 12;

  return (
    <ScrollView style={styles.screen}>
      <View style={[styles.container, { marginVertical: marginY, rowGap }]}>
        <Title style={styles.titleText}>Game Over!</Title>
        <View
          style={[
            styles.imageContainer,
            {
              width: imageSize,
              height: imageSize,
              borderRadius: imageSize / 2,
            },
          ]}
        >
          <Image
            style={[styles.image]}
            source={require("../assets/image/success.png")}
          />
        </View>
        <View>
          {maxGuesses === 10 ? (
            <Text style={styles.guessText}>
              Your phone get max of 10 tries to guess!
            </Text>
          ) : (
            <Text style={styles.guessText}>
              Your phone needed{" "}
              <Text style={styles.guessTextHighlight}>{maxGuesses}</Text> tries
              to guess the number{" "}
              <Text style={styles.guessTextHighlight}>{pickedNumber}</Text>
            </Text>
          )}
        </View>

        <Button
          title="Start New Game"
          onPress={newGameHandler}
          pressStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // rowGap: 12,
    // padding: 24,
  },
  titleText: {
    color: color.green,
    borderColor: color.green,
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: color.green,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  guessText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: color.green,
    textAlign: "center",
  },
  guessTextHighlight: {
    color: color.orange,
    fontSize: 22,
  },
});
