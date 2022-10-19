import { CLEAR_MESSAGE, MessageActionTypes, SET_MESSAGE } from "../actions/messages.actiontypes";
import { Message } from "../types/message.types";

const inititialState: Message = {
  message: "",
};

export function messageReducer(state: Message, action: MessageActionTypes): Message {
  const {type, payload} = action;
  switch(type){
    case SET_MESSAGE: 
      return {message: payload};
    case CLEAR_MESSAGE:
      return {message: ""};
    default: 
      return state;
  }
}