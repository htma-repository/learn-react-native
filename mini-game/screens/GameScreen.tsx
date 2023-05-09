import { useState, useEffect, useMemo } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  useWindowDimensions,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/UI/Card";
import Title from "../components/UI/Title";
import Button from "../components/UI/Button";
import NumberGuess from "../components/Games/NumberGuess";
import generateRandomBetween from "../utils/randomNumber";
import InstructionText from "../components/UI/InstructionText";
import LogNumberGuess from "../components/Games/LogNumberGuess";
import { color } from "../utils/colors";

interface IGameScreen {
  userNumber: number;
  maxGuesses: number;
  onGameOver: (value: boolean) => void;
  onMaxGuesses: React.Dispatch<React.SetStateAction<number>>;
}

let minNumber = 1;
let maxNumber = 100;
const maxGuessesNumber = 10;

const screenWidth = Dimensions.get("window").width;

export default function GameScreen({
  userNumber,
  onGameOver,
  maxGuesses,
  onMaxGuesses,
}: IGameScreen) {
  const initialNumber = useMemo(
    () => generateRandomBetween(1, 100, userNumber),
    [userNumber]
  );
  const [guessNumber, setGuessNumber] = useState<number>(initialNumber);
  const [logGuessNumber, setLogGuessNumber] = useState<number[]>([
    initialNumber,
  ]);
  const { height, width } = useWindowDimensions();

  const marginTop = height < 380 ? 30 : 64;

  const colorIcon = Platform.select({
    android: color.green,
    ios: color.orange,
  });

  const LogNumberGuessLength = logGuessNumber.length;

  useEffect(() => {
    if (guessNumber === userNumber) {
      Alert.alert("Congrats!", "Opponent successfully guess your number!", [
        {
          text: "OK",
          style: "default",
          onPress: () => onGameOver(true),
        },
      ]);
    }
  }, [guessNumber, userNumber]);

  useEffect(() => {
    minNumber = 1;
    maxNumber = 100;
  }, []);

  const directionButtonHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && guessNumber < userNumber) ||
      (direction === "greater" && guessNumber > userNumber)
    ) {
      Alert.alert("Dont lie!", "You know this is wrong", [
        {
          text: "OK",
          style: "cancel",
        },
      ]);
      return;
    }

    if (maxGuesses !== maxGuessesNumber) {
      if (direction === "lower") {
        maxNumber = guessNumber;
      } else {
        minNumber = guessNumber + 1;
      }

      const newRandomNumber = generateRandomBetween(
        minNumber,
        maxNumber,
        guessNumber
      );

      setGuessNumber(newRandomNumber);
      setLogGuessNumber((prevState) => [newRandomNumber, ...prevState]);
      onMaxGuesses((prevState) => prevState + 1);
    } else {
      Alert.alert("You Win!", "Opponent failed guess your number!", [
        {
          text: "OK",
          style: "default",
          onPress: () => onGameOver(true),
        },
      ]);
    }
  };

  let contentList = (
    <View style={styles.flatListContainer}>
      {logGuessNumber?.map((item, index) => (
        <LogNumberGuess
          key={item}
          logNumber={item}
          numberGuess={LogNumberGuessLength - index}
        />
      ))}
    </View>
  );

  if (width > 500) {
    contentList = (
      <FlatList
        horizontal
        data={logGuessNumber}
        renderItem={({ item, index }) => (
          <LogNumberGuess
            logNumber={item}
            numberGuess={LogNumberGuessLength - index}
          />
        )}
        keyExtractor={(item) => item.toString()}
        style={styles.flatListContainer}
      />
    );
  }

  return (
    <ScrollView style={styles.screen} nestedScrollEnabled={true}>
      <View style={[styles.gameScreenContainer, { marginTop: marginTop }]}>
        <Title>Opponent's Guest</Title>
        <NumberGuess>{guessNumber}</NumberGuess>
        <Card style={styles.cardContainer}>
          <Text style={styles.TriesText}>Tries: {maxGuesses}/10</Text>
          <InstructionText>Lower or Greater ?</InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title={
                  <Ionicons name="md-remove" size={28} color={colorIcon} />
                }
                onPress={directionButtonHandler.bind(null, "lower")}
                textStyle={styles.buttonText}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={<Ionicons name="md-add" size={28} color={colorIcon} />}
                onPress={directionButtonHandler.bind(null, "greater")}
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        </Card>
        {contentList}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  gameScreenContainer: {
    flex: 1,
    paddingHorizontal: 24,
    // justifyContent: "center",
    // alignItems: "center",
  },
  cardContainer: {
    rowGap: screenWidth < 380 ? 12 : 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    columnGap: 16,
  },
  buttonContainer: {
    flex: 1,
    overflow: "hidden",
  },
  flatListContainer: {
    marginVertical: 12,
    margin: 12,
  },
  buttonText: {
    fontSize: 26,
  },
  TriesText: {
    fontFamily: "Inter-SemiBold",
    fontSize: screenWidth < 380 ? 16 : 20,
    color: color.orange,
  },
});
