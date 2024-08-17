import { Message } from "../models/chatDataModels";

async function sendMessage(message: Message) {
  const response = await fetch("http://localhost:3000/chat/addMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (response.ok) {
    console.log("message sent");
  } else {
    console.log("message not sent");
  }
  return response;
}

export default sendMessage;
