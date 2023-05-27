import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface IAuth {
  email: string;
  password: string;
}

export interface ICredentials extends IAuth {
  confirmEmail: string;
  confirmPassword: string;
}

export interface IFirebase {
  idToken: string;
  refreshToken: string;
}

export interface IFirebaseRefresh {
  id_token: string;
  refresh_token: string;
}

export interface ICredentialsIsValid {
  email: boolean;
  password: boolean;
  confirmEmail: boolean;
  confirmPassword: boolean;
}

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Welcome: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type SignUpScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

export type WelcomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;
