import axios from "axios";

import { axiosInstance } from "./axios";
import { IAuth, IFirebase, IFirebaseRefresh } from "../types/types";

export const API_KEY = "AIzaSyAup3zFTCF9cDIeOYy0uY99O4qm4z5N_gY";

// export const refreshTokenRequest = async (refreshToken: string) => {
//   const response = await axios.post<IFirebaseRefresh>(
//     `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
//     { grant_type: "refresh_token", refresh_token: refreshToken }
//   );
//   return response;
// };

export const signUpRequest = async (newUser: IAuth) => {
  const response = await axiosInstance.post<IFirebase>(
    `/accounts:signUp?key=${API_KEY}`,
    {
      ...newUser,
      returnSecureToken: true,
    }
  );
  return response;
};

export const signInRequest = async (user: IAuth) => {
  const response = await axiosInstance.post<IFirebase>(
    `/accounts:signInWithPassword?key=${API_KEY}`,
    { ...user, returnSecureToken: true }
  );
  return response;
};

// export const fetchMessage = async (
//   accessToken: string,
//   signal: GenericAbortSignal
// ) => {
//   const axiosPrivate = useAxiosPrivate();
//   const response = await axiosPrivate.get(`/message.json?auth=${accessToken}`, {
//     signal: signal,
//   });
//   return response;
// };
