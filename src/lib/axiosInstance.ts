"use client";

import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./auth";

export const axiosWithJWT: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

axiosWithJWT.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosWithJWT.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await axios.get("/api/v1/auth/token");
        const newToken: string = token.data.accessToken;
        setAccessToken(newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosWithJWT(originalRequest);
      } catch (error) {
        clearAccessToken();
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);
