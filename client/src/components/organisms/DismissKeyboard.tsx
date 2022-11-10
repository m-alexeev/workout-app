import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native'

export interface IDismissKeyboardProps{
  children: any
}

const DismissKeyboard: React.FC<IDismissKeyboardProps> = ({children})=> {
  return(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard;