// lib/api.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Extend AxiosRequestConfig to include _retry flag
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// ========== REQUEST INTERCEPTOR ==========
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("accessToken");
  if (access && config.headers) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// ========== RESPONSE INTERCEPTOR ==========
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Handle 401 only ONCE
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh endpoint
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // Save new token
        localStorage.setItem("accessToken", newAccessToken);

        // Attach new access token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Logout completely
        localStorage.removeItem("accessToken");
        deleteCookie("refreshToken");

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
