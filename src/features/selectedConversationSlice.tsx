import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../models/chatDataModels";

interface SelectedConversationState {
  roomId: string;
  roomName: string;
  messageCollectionid: string;
}

const initialState: SelectedConversationState = {} as SelectedConversationState;

const selectedConversationSlice = createSlice({
  name: "selectedConversation",
  initialState,
  reducers: {
    selectConversation: (state, action: PayloadAction<Conversation>) => {
      state.roomId = action.payload.roomId;
      state.roomName = action.payload.roomName;
      state.messageCollectionid = action.payload.messageCollectionId;
    },
  },
});

export default selectedConversationSlice.reducer;
export const { selectConversation } = selectedConversationSlice.actions;
