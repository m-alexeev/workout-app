import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { filterReducer } from './reducers/filter.reducer';
import { combineReducers } from 'redux';
// import { userReducer } from './reducers/user.reducer';
import { messageReducer } from './reducers/message.reducer';
import exercisesReducer from './reducers/exercises.reducer';
import userReducer from './reducers/user.reducer';

const rootReducers = combineReducers({
  filter: filterReducer,
  exercises: exercisesReducer,
  user: userReducer,
  message: messageReducer,
})


export const store = configureStore({
  reducer: rootReducers, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})


export type RootState = ReturnType<typeof rootReducers>;

export type AppDispatch = typeof store.dispatch;