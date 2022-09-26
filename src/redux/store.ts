import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);

const reducer = {

}

export const store = configureStore({
  reducer, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})