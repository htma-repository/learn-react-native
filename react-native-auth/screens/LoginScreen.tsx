import { shallow } from "zustand/shallow";
import { useNavigation } from "@react-navigation/native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { useAuthStore } from "../store/store";

function LoginScreen() {
  const { authHandler, isLoading } = useAuthStore(
    (state) => ({
      authHandler: state.authHandler,
      isLoading: state.isLoading,
    }),
    shallow
  );

  return (
    <>
      {isLoading ? (
        <LoadingOverlay message="Loading..." />
      ) : (
        <AuthContent isLogin={true} onAuthenticate={authHandler} />
      )}
    </>
  );
}

export default LoginScreen;
