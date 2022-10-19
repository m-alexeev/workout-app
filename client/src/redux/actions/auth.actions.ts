import { Dispatch } from "redux";
import AuthService from "../../services/auth.service";
import { User, UserToken } from "../types/auth.types";
import {
  AuthAction,
  AuthActionType,
  AuthRehydateAction,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REHYDRATE,
} from "./auth.actiontypes";
import { SET_MESSAGE, UpdateMessageAction } from "./messages.actiontypes";

export const register =
  (email: string, password: string, first_name: string, last_name: string) =>
  (dispatch: Dispatch<AuthActionType | UpdateMessageAction>) => {
    return AuthService.register(email, password, first_name, last_name).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const login =
  (email: string, password: string) =>
  (dispatch: Dispatch<AuthActionType | UpdateMessageAction>) => {
    return AuthService.login(email, password).then(
      (response) => {
        const userToken: UserToken = {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
        };
        dispatch({
          type: LOGIN_SUCCESS,
          payload: userToken,
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch: Dispatch<AuthAction>) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const rehydrate = () => (dispatch: Dispatch<AuthRehydateAction>) => {
  AuthService.getCurrentUser().then((user) => {
    dispatch({
      type: REHYDRATE,
      payload: user,
    });
  });
};
