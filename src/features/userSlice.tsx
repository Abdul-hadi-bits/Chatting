import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoggedInUser } from "../models/chatDataModels";

interface UserState {
  user: LoggedInUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<LoggedInUser>) => {
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
