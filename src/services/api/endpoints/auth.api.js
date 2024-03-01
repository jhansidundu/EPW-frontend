import api from "../axios/axios.service";

export const login = async (payload) => {
  const response = await api.post("user/login", payload);
  return response.data;
};

export const signup = async (payload) => {
  const response = await api.post("user/signup", payload);
  return response.data;
};

export const isTokenValid = async () => {
  const response = await api.get("user/validate-token");
  return response.data;
};

export const verifyEmail = async (email) => {
  const response = await api.get(`user/verify/email/${email}`);
  return response.data;
};
