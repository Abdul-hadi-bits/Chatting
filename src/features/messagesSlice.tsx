import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../models/chatDataModels";

const initialState: Array<Message> = [];

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    initializeMessages: (state, action: PayloadAction<Array<Message>>) => {
      state.splice(0, state.length);

      action.payload.forEach((message) => {
        state.push(message);
      });
    },
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default messagesSlice.reducer;
export const { initializeMessages, addMessage } = messagesSlice.actions;
