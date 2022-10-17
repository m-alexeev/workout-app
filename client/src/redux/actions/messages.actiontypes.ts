export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export interface UpdateMessageAction {
    type: typeof SET_MESSAGE
    payload: string
};

export interface ClearMessageAction {
    type: typeof CLEAR_MESSAGE
    payload: string
}