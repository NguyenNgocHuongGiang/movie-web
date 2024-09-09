import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./reducers/carouselDetail";
import phimReducer from "./reducers/phimDetail"
import rapReducer from "./reducers/rapDetail"

const rootReducer = combineReducers({
    carouselReducer,
    phimReducer,
    rapReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Middleware mặc định bao gồm redux-thunk
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DispatchType = typeof store.dispatch;
