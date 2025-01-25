import axios from "axios";
import $api, { API_URL } from "../http";

export default class AuthService {
  static async registration(email, password, username) {
    try {
      const response = await $api.post("/registration", {
        email,
        password,
        username,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const response = await $api.post("/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      const response = await $api.post("/logout");
      return response.data;
    } catch (error) {s
      throw error;
    }
  }

  static async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
