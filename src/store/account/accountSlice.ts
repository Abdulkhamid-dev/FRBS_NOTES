import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  userId: string;
  role: string;
}

const initialState: CounterState = {
  userId: "",
  role: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updateAccount: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearAccount: () => {
      return initialState;
    },
  },
});

export const { clearAccount, updateAccount } = accountSlice.actions;

export default accountSlice.reducer;
