import { shallow } from "zustand/shallow";

import { axiosPrivate } from "../utils/axios";
import { useEffect } from "react";
import { useAuthStore } from "../store/store";

const useAxiosPrivate = () => {
  const { refreshTokenHandler, accessToken } = useAuthStore(
    (state) => ({
      refreshTokenHandler: state.refreshTokenHandler,
      accessToken: state.accessToken,
    }),
    shallow
  );

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 || !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshTokenHandler();
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
  }, [refreshTokenHandler, accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
