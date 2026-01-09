import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens } from "../utils/auth";
import { clearTokens } from "../utils/auth";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

API.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handles token refresh
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Call your refresh token endpoint
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}/auth/refresh`,
                    { refresh: refreshToken }
                );

                const newAccessToken = response.data.access;
                setTokens(newAccessToken, refreshToken);

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                // Refresh failed - clear tokens and redirect to login
                clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default API;
