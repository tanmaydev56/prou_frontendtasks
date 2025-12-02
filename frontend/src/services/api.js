import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000", // your backend URL
});

// Attach role and user info to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    config.headers["x-user-id"] = user.name;
    config.headers["x-user-role"] = user.role;
  }

  return config;
});
