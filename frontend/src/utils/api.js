import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;