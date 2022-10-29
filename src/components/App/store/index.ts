import { RootState as R, AppDispatch as A } from "./store";
export { store, createStoreWithConfig, persistConfig } from "./store";
export { useStorePersistor, useAppDispatch, useAppSelector } from "./hooks";
export { default as rootReducer, rawReducers } from "./reducers";

export type RootState = R;
export type AppDispatch = A;
