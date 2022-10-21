import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { filterReducer } from './reducers/filter.reducer';
import { combineReducers } from 'redux';
import { userReducer } from './reducers/user.reducer';
import { messageReducer } from './reducers/message.reducer';
import { UserState } from './types/auth.types';
import { FilterActionTypes } from './actions/filter.actiontypes';




const rootReducers = combineReducers({
  filter: filterReducer,
  user: userReducer,
  message: messageReducer,
})


export const store = configureStore({
  reducer: rootReducers, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;