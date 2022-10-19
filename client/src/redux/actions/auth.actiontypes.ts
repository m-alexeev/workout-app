import { User, UserToken } from "../types/auth.types";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const REHYDRATE = "REHYDRATE";


export interface AuthPayloadAction {
    type:  typeof LOGIN_SUCCESS 
    payload: User,
}

export interface AuthAction {
    type: typeof REGISTER_SUCCESS | typeof REGISTER_FAIL | typeof LOGIN_FAIL | typeof LOGOUT 
}

export interface AuthRehydateAction{
    type: typeof REHYDRATE
    payload: User | null
}

export type AuthActionType = AuthPayloadAction | AuthAction | AuthRehydateAction;