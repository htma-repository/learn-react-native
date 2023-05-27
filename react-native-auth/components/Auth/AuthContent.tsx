import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { shallow } from "zustand/shallow";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import ErrorOverlay from "../ui/ErrorOverlay";
import { useAuthStore } from "../../store/store";
import { Colors } from "../../constants/styles";
import {
  IAuth,
  ICredentials,
  LoginScreenNavigationProp,
} from "../../types/types";

interface IAuthContentProps {
  isLogin: boolean;
  onAuthenticate: (authData: IAuth, isLogin?: boolean) => void;
}

function AuthContent({ isLogin, onAuthenticate }: IAuthContentProps) {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const { isError, errorMessage } = useAuthStore(
    (state) => ({
      isError: state.isError,
      errorMessage: state.errorMessage,
    }),
    shallow
  );

  const navigation = useNavigation<LoginScreenNavigationProp>();

  function switchAuthModeHandler() {
    // Todo
    if (isLogin) {
      navigation.replace("SignUp");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials: ICredentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    if (isLogin) {
      onAuthenticate({ email, password }, isLogin);
    } else {
      onAuthenticate({ email, password }, false);
    }
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
      {isError && (
        <ErrorOverlay
          titleText={isLogin ? "Login Failed!" : "Create User Failed!"}
          descText={errorMessage}
        />
      )}
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
