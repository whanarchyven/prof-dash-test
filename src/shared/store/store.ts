import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import exampleName from './exampleSlice';
import timelineReducer from './timelineSlice';

const combinedReducer = combineReducers({
  exampleName,
  timelineReducer,
});

export const makeStore = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const typeStore = () => makeStore;

export const wrapper = createWrapper<AppStore>(() => makeStore);
export const store = makeStore;
export type AppStore = ReturnType<typeof typeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export interface HydrateAction {
  type: typeof HYDRATE;
  payload: RootState;
}
