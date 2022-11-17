import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserObject } from "../redux/types/auth.types";
import { Buffer } from "buffer";

const API_URL = "http://192.168.0.16:5000/api/";

class AuthService {
  login(email: string, password: string) {
    const encodedUser = Buffer.from(`${email}:${password}`, "utf-8").toString(
      "base64"
    );
    return axios.post(
      API_URL + "tokens",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedUser}==`,
        },
      }
    );
  }

  logout() {
    AsyncStorage.removeItem("user");
  }

  register(
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) {
    return axios.post(API_URL + "users", {
      email,
      password,
      first_name,
      last_name,
    });
  }

  fetchUser(token: string) {
    return axios.get(API_URL + "me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createNewUser(user: {
    first_name: string;
    last_name: string;
    height: number;
    weight: number;
  }): Promise<UserObject | null> {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch {
      //saving error
      console.log("Failed to save user");
    }
    return user;
  }

  async getCurrentUser(): Promise<UserObject | null> {
    const userStr = await AsyncStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

export default new AuthService();
