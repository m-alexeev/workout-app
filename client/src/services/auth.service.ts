import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserObject } from "../redux/types/auth.types";
import { Buffer } from "buffer";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://192.168.0.16:5000/api/";

const createLocalUser = createAsyncThunk(
  "user/create",
  async (user: UserObject) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
      return user as UserObject;
    }catch (error){
      console.log("Failed to save User");
      return null;
    }
  }
);

const rehydrate = createAsyncThunk(
  "user/rehydrate", async() => {
    try{
      const res = await AsyncStorage.getItem("user")
      if (res){
        return JSON.parse(res) as UserObject;
      }
      else{
        return null;
      }
    }catch( error) {
      console.log(error);
      return null;  
    }
  }
)

const logout = createAsyncThunk(
  'user/logout', () => {
    AsyncStorage.removeItem('user');
  }
)

export {createLocalUser, rehydrate, logout}

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

  async createNewUser(user: UserObject): Promise<UserObject | null> {
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
