import { Conversation } from "../models/chatDataModels";

async function getConversations(
  userRoomCollectoinId: string
): Promise<Conversation[]> {
  const response = await fetch(
    `http://localhost:3000/chat/getRooms/${userRoomCollectoinId}`
  );
  const data = await response.json();
  //console.log("rooms are: ", data);
  return data;
}

export default getConversations;
