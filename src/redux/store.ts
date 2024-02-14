import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import formStateReducer from "./slices/formState"

export const store = configureStore({
    reducer:{
        formModalState:formStateReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware()
})

setupListeners(store.dispatch)

export default store;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 