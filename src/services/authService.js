import http from "./httpService";
import config from '../config.json';
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiEndPoint + "/api/auth";
// const tokenKey = config.apiEndPoint + "/api/token";
const token = 'tokenKey';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } =
      await http.post(apiEndpoint, { email, password });
      loginWithJwt(jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(token, jwt);
}

export function logout() {
  localStorage.removeItem(token);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
//
export function getJwt() {
  return localStorage.getItem(token);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
