import { configureStore } from "@reduxjs/toolkit";

import conversationSlice from "../features/conversationsSlice";
import messageSlice from "../features/messagesSlice";
import selectedConversationSlice from "../features/selectedConversationSlice";
import userSlice from "../features/userSlice";

const appStore = configureStore({
  reducer: {
    conversations: conversationSlice,
    messages: messageSlice,
    selectedConversation: selectedConversationSlice,
    user: userSlice,
  },
});

export default appStore;

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
