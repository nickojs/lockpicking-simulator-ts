import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import settingsReducer from './settingsSlice';
import picksReducer from './pickSlice';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  pick: picksReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
