import AsyncStorage from "@react-native-async-storage/async-storage";
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
  REHYDRATE_FAIL,
} from "./auth.actiontypes";
import { SET_MESSAGE, UpdateMessageAction } from "./messages.actiontypes";

const getMessage = (error: any): string => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

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
          payload: {
            message: response.data.message,
            type: "success",
          },
        });

        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: {
            message: getMessage(error),
            type: "error",
          },
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
        AuthService.fetchUser(userToken.access_token)
          .then((response) => {
            const user: User = {
              id: response.data.id,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              email: response.data.email,
              tokens: userToken,
            };
            // Save user in local storage
            AsyncStorage.setItem("user", JSON.stringify(user));

            // Dispatch successful login
            dispatch({
              type: LOGIN_SUCCESS,
              payload: user,
            });

            return Promise.resolve();
          })
          .catch((error) => {
            dispatch({
              type: LOGIN_FAIL,
            });
            dispatch({
              type: SET_MESSAGE,
              payload: {
                message: getMessage(error),
                type: "error",
              },
            });
          });

        return Promise.resolve();
      },
      (error) => {
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: {
            message: getMessage(error),
            type: "error",
          },
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
    if (user) {
      dispatch({
        type: REHYDRATE,
        payload: user,
      });
    } else {
      dispatch({
        type: REHYDRATE_FAIL,
        payload: null,
      });
    }
  });
};
