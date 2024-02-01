import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer:{},
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
})

setupListeners(store.dispatch)

export default store;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 