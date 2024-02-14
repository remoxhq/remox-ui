import { RootState } from "@redux/store";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const FormState = createDraftSafeSelector(
    (state:RootState) => state.formModalState.open,
    (open)=>open
)