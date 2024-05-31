import {  configureStore,  combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import courseReducer from './course/courseSlice';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'] // Add any other reducers you want to persist here
};

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);