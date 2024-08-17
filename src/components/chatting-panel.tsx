import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Message } from "../models/chatDataModels";
import "../style/App.css";
import "../style/chattingArea.css";
import sendMessage from "../api-calls/sendMessage";
import { initializeMessages } from "../features/messagesSlice";
function ChattingPanel() {
  const [inputMessage, setInputMessage] = useState("");
  const state = useAppSelector((state) => state.messages);
  const userState = useAppSelector((state) => state.user);
  const selectConversationState = useAppSelector(
    (state) => state.selectedConversation
  );

  const dispatch = useAppDispatch();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:3000/chat/stream/${selectConversationState.messageCollectionid}`
    );

    eventSource.onmessage = (event) => {
      console.log("event received");
      const messages: Message[] = JSON.parse(event.data);

      dispatch(initializeMessages(messages));
    };

    eventSource.onerror = () => {
      console.log("event error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [selectConversationState.messageCollectionid]);

  useEffect(() => {
    // to scroll up when ever a new message is added
    if (overlayRef.current) {
      overlayRef.current.scrollTop = overlayRef.current.scrollHeight;
    }
  }, [state]);

  const handleSend = () => {
    if (inputMessage === "" || userState.user == null) {
      return;
    }
    const message: Message = {
      messageText: inputMessage,
      senderName: userState.user.username,
      messageCollectionId: selectConversationState.messageCollectionid,
      messageId: "",
    };
    sendMessage(message).then(() => {
      setInputMessage("");
    });
  };

  return (
    <div id="chatting-area">
      <div id="overlay" ref={overlayRef}>
        {state.map((message) => {
          return (
            <div
              key={message.messageId}
              className={
                message.senderName == userState.user?.username
                  ? "message-owner message"
                  : "message-other message"
              }
            >
              <p>{message.messageText}</p>
            </div>
          );
        })}
      </div>
      <div id="send-message-area">
        <textarea
          id="message-input"
          placeholder="Message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button id="send-message-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChattingPanel;
