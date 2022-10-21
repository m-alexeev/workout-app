import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthActionType,
  LOGOUT,
  REHYDRATE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REHYDRATE_FAIL,
} from "../actions/auth.actiontypes";
import { UserState } from "../types/auth.types";

const initialUserState: UserState = {
  isLoggedIn: false,
  user: null,
};

export function userReducer(
  state: UserState = initialUserState, 
  action: AuthActionType
): UserState {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS: 
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGIN_FAIL: 
      return {
        ...state,
        isLoggedIn: false,
        user: null
      }
    case LOGOUT: 
      return {
        ...state, 
        isLoggedIn: false,
        user: null,
      }
    case REHYDRATE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      }
    case REHYDRATE_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
  }
  return state;
}
