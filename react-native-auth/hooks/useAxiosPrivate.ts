import { useEffect } from "react";

// import { useAuthStore } from "../store/store";
import { axiosPrivate } from "../utils/axios";
import useRefreshToken from "./useRefreshToken";
import { retrieveUserStorage } from "../utils/storage";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          console.log("running requestIntercept");
          const accessToken = await retrieveUserStorage("accessToken");
          config.headers["Authorization"] = `Bearer ${accessToken as string}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log({ prevRequest });
        if (error?.response?.status >= 400 && !prevRequest?.sent) {
          console.log("running responseIntercept");
          prevRequest.sent = true;
          const refreshToken = await retrieveUserStorage("refreshToken");
          const newAccessToken = await refresh(refreshToken as string);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, retrieveUserStorage]);

  return axiosPrivate;
};

export default useAxiosPrivate;
