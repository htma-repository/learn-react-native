import { shallow } from "zustand/shallow";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAuthStore } from "../store/store";

function SignUpScreen() {
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
        <AuthContent isLogin={false} onAuthenticate={authHandler} />
      )}
    </>
  );
}

export default SignUpScreen;
