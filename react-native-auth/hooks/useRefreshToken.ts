import axios from "axios";

import { useAuthStore } from "../store/store";
import { IFirebaseRefresh } from "../types/types";
import { API_KEY } from "../utils/api";
import { storeUserStorage } from "../utils/storage";

const useRefreshToken = () => {
  const retrieveStorage = useAuthStore((state) => state.retrieveStorage);

  const refresh = async (refreshToken: string) => {
    const response = await axios.post<IFirebaseRefresh>(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      { grant_type: "refresh_token", refresh_token: refreshToken }
    );

    const newAccessToken = response.data.id_token;
    const newRefreshToken = response.data.refresh_token;

    await storeUserStorage("accessToken", newAccessToken);
    await storeUserStorage("refreshToken", newRefreshToken);

    retrieveStorage(newAccessToken);

    return newAccessToken;
  };
  return refresh;
};

export default useRefreshToken;
