import {
  AuthActionType,
  LOGOUT,
  REHYDRATE,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REHYDRATE_FAIL,
  CREATE_SUCCESS,
  CREATE_FAIL,
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
    case CREATE_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case CREATE_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case REHYDRATE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case REHYDRATE_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
  }
  return initialUserState;
}
