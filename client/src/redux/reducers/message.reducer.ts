import { CLEAR_MESSAGE, MessageActionTypes, SET_MESSAGE } from "../actions/messages.actiontypes";
import { Message } from "../types/message.types";

const inititialState: Message = {
  message: "",
  type: "none",
};

export function messageReducer(state: Message = inititialState, action: MessageActionTypes): Message {
  const {type, payload} = action;
  switch(type){
    case SET_MESSAGE: 
      return payload;
    case CLEAR_MESSAGE:
      return {message: "", type: "none"};
    default: 
      return state;
  }
}