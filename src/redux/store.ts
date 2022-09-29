import {configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { filterReducer } from './reducers/filter.reducer';
import { combineReducers } from 'redux';


const rootReducers = combineReducers({
  filter: filterReducer,
})


export const store = configureStore({
  reducer: rootReducers, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})