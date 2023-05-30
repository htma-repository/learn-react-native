import { create } from "zustand";
import { isAxiosError } from "axios";

import { signUpRequest, signInRequest } from "../utils/api";
import { storeUserStorage, removeUserStorage } from "../utils/storage";
import { IAuth } from "../types/types";

interface IAuthState {
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  accessToken: string | null;
  authHandler: (newUser: IAuth, isLogin?: boolean) => void;
  unAuthHandler: () => void;
  // refreshTokenHandler: () => Promise<string>;
  retrieveStorage: (accessToken: string) => void;
}

export const useAuthStore = create<IAuthState>((set, get) => ({
  accessToken: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
  authHandler: async (user, isLogin) => {
    try {
      set({ isLoading: true });
      const response = isLogin
        ? await signInRequest(user)
        : await signUpRequest(user);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }

      const accessToken = response.data.idToken;
      const refreshToken = response.data.refreshToken;

      await storeUserStorage("accessToken", accessToken);
      await storeUserStorage("refreshToken", refreshToken);

      set({
        isLoading: false,
        isAuth: !!accessToken,
        accessToken: accessToken,
      });
    } catch (error) {
      set({ isLoading: false, isError: true });
      if (!isAxiosError(error)) {
        set({ errorMessage: isLogin ? "Login Failed" : "Create User Failed" });
        return;
      }
      if (!error.response) {
        set({ errorMessage: "No Server Response" });
      } else if (error.response?.status === 400) {
        set({ errorMessage: "Missing Username or Password" });
      } else if (error.response?.status === 401) {
        set({ errorMessage: "Unauthorized" });
      } else if (error.response?.status === 409) {
        set({ errorMessage: "Username Taken" });
      }
    }
  },
  unAuthHandler: async () => {
    await removeUserStorage("accessToken");
    await removeUserStorage("refreshToken");
    set({
      accessToken: null,
      isAuth: false,
    });
  },
  // refreshTokenHandler: async () => {
  //   const refreshToken = await retrieveUserStorage("refreshToken");
  //   const response = await refreshTokenRequest(refreshToken as string);
  //   if (response.status !== 200) {
  //     throw new Error("Something went wrong");
  //   }

  //   const newAccessToken = response.data.id_token;
  //   const newRefreshToken = response.data.refresh_token;

  //   await storeUserStorage("accessToken", newAccessToken);
  //   await storeUserStorage("refreshToken", newRefreshToken);

  //   set({
  //     accessToken: newAccessToken,
  //   });
  //   return newAccessToken;
  // },
  retrieveStorage: (accessToken) => {
    set({ accessToken: accessToken, isAuth: !!accessToken });
  },
}));
