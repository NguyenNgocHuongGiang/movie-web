import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./reducers/carouselDetail";
import phimReducer from "./reducers/phimDetail"
import rapReducer from "./reducers/rapDetail"
import nguoiDungReducer from "./reducers/nguoiDungDetail"
import datVeReducer from "./reducers/datVeDetail"

const rootReducer = combineReducers({
    carouselReducer,
    phimReducer,
    rapReducer,
    nguoiDungReducer,
    datVeReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Middleware mặc định bao gồm redux-thunk
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type DispatchType = typeof store.dispatch;
