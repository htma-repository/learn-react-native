import React, { useState } from "react";
import { View, StyleSheet, Alert, useWindowDimensions } from "react-native";

import Card from "../UI/Card";
import InstructionText from "../UI/InstructionText";
import Title from "../UI/Title";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { color } from "../../utils/colors";

interface IHomeInput {
  onPickedNumber: (pickNumber: number) => void;
}

export default function HomeInput({ onPickedNumber }: IHomeInput) {
  const [numberInput, setNumberInput] = useState<string>("");

  const { width } = useWindowDimensions();

  const numberInputHandler = (text: string) => {
    setNumberInput(text);
  };

  const submitHandler = () => {
    if (+numberInput <= 0 || +numberInput > 99) {
      Alert.alert("Warning!", "Please Input Number Correctly \n 1-99", [
        {
          text: "OK",
          onPress: resetHandler,
        },
      ]);
      return;
    }
    onPickedNumber(+numberInput);
    setNumberInput("");
  };

  const resetHandler = () => {
    setNumberInput("");
  };

  const cardRowGap = width < 400 ? 24 : 10;

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card style={{ rowGap: cardRowGap }}>
        <InstructionText>Enter Number</InstructionText>
        <Input
          onChangeText={numberInputHandler}
          value={numberInput}
          style={styles.input}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={resetHandler} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={submitHandler} />
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    rowGap: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  // cardContainer: { rowGap: 12 },
  buttonsContainer: {
    flexDirection: "row",
    columnGap: 16,
  },
  buttonContainer: {
    flex: 1,
    overflow: "hidden",
  },
  input: {
    fontSize: 34,
    fontWeight: "bold",
    color: color.orange,
    width: 100,
    textAlign: "center",
  },
});
