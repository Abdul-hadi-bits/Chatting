type Conversation = {
  roomId: string;
  roomName: string;
  messageCollectionId: string;
};

type Message = {
  messageId: string;
  messageCollectionId: string;
  messageText: string;
  senderName: string;
};

type User = {
  userId: string;
  username: string;
};

type LoggedInUser = {
  userId: string;
  username: string;
  roomsCollectionId: string;
};
type RegisterUser = {
  userName: string;
  password: string;
};

export type { Conversation, Message, User, LoggedInUser, RegisterUser };
