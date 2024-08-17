import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../models/chatDataModels";

interface ConversationsState {
  roomId: string;
  roomName: string;
  messageCollectionId: string;
}

const initialState: Array<ConversationsState> = [];

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    initialzeConversations: (
      state,
      action: PayloadAction<Array<Conversation>>
    ) => {
      // empty out conversations and add new ones form payload
      state.splice(0, state.length);
      action.payload.forEach((conversation) => {
        state.push(conversation);
      });
    },
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.push(action.payload);
    },
  },
});

export default conversationsSlice.reducer;
export const { initialzeConversations, addConversation } =
  conversationsSlice.actions;
