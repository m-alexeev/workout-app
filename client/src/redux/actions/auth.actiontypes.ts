import { User, UserObject, UserToken } from "../types/auth.types";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const REHYDRATE = "REHYDRATE";
export const REHYDRATE_FAIL = "REHYDRATE_FAIL"

export const CREATE_SUCCESS = "CREATE_SUCCESS";
export const CREATE_FAIL = "CREATE_FAIL";


export interface AuthPayloadAction {
    type:  typeof LOGIN_SUCCESS 
    payload: User,
}

export interface AuthAction {
    type: typeof REGISTER_SUCCESS | typeof REGISTER_FAIL | typeof LOGIN_FAIL | typeof LOGOUT | typeof CREATE_FAIL
}

export interface AuthLocalPayloadAction {
    type: typeof CREATE_SUCCESS 
    payload: UserObject
}

export interface AuthRehydateAction{
    type: typeof REHYDRATE | typeof REHYDRATE_FAIL
    payload: UserObject | null
}

export type AuthActionType = AuthPayloadAction | AuthAction | AuthRehydateAction | AuthLocalPayloadAction;