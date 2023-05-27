import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";
import { ICredentials, ICredentialsIsValid } from "../../types/types";

interface IAuthFormProps {
  isLogin: boolean;
  onSubmit: (credentials: ICredentials) => void;
  credentialsInvalid: ICredentialsIsValid;
}

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: IAuthFormProps) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType: string, enteredValue: string) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View>
        <Input
          label="Email Address"
          onChangeText={updateInputValueHandler.bind(null, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={!!emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onChangeText={updateInputValueHandler.bind(null, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={!!emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onChangeText={updateInputValueHandler.bind(null, "password")}
          value={enteredPassword}
          isInvalid={!!passwordIsInvalid}
          secureTextEntry
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onChangeText={updateInputValueHandler.bind(null, "confirmPassword")}
            secureTextEntry
            value={enteredConfirmPassword}
            isInvalid={!!passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
