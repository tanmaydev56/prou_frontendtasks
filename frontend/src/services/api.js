import axios from "axios";

export const API = axios.create({
  baseURL:"https://backend-prou.onrender.com"
});


API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) config.headers["x-user-role"] = user.role;
  return config;
});

