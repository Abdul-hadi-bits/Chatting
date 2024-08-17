import { BiSortUp } from "react-icons/bi";
import { Message } from "../models/chatDataModels";

async function getMessages(messageCollectionId: string): Promise<Message[]> {
  if (messageCollectionId === "") {
    return [];
  }
  const response = await fetch(
    `http://localhost:3000/chat/getMessages/${messageCollectionId}`
  );
  const data = await response.json();
  console.log("messages are: ", data);
  return data;
}

async function getMessageStream(messageCollectionId: string) {}

export default getMessages;
export { getMessageStream };
