import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface IProps {
  open: boolean;
}

const initialState = {
  open: false,
} as IProps;


const formState = createSlice({
  name: "formModalState",
  initialState,
  reducers:{
      changeState(state,action:PayloadAction<boolean>){
        state.open = action.payload
      }
  }
});

export const {changeState} = formState.actions

export default formState.reducer
