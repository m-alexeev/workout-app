import { ActionCreator } from "redux";
import { SET_MESSAGE, CLEAR_MESSAGE, UpdateMessageAction, ClearMessageAction } from "./messages.actiontypes";

const setMessage: ActionCreator<UpdateMessageAction> = (message: string) => {
    return {
        type: SET_MESSAGE,
        payload: message,
    }
}

const clearMessage: ActionCreator<ClearMessageAction> = () => {
    return {
        type: CLEAR_MESSAGE, 
        payload: ""
    }
}

export {setMessage, clearMessage};