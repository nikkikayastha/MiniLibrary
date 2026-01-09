import API from "./api";
import { clearTokens } from "../utils/auth";

export const registerUser = (data) => {
  return API.post("auth/register/", data);
};

export const loginUser = (data) => {
  return API.post("auth/login/", data);
}

export const logoutUser = () => {
    clearTokens();
    // Optionally call a logout endpoint on your backend
    // return API.post('/auth/logout/');
};

export const refreshToken = (refreshToken) => {
    return API.post('/auth/refresh/', { refresh: refreshToken });
};