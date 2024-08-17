import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import getConversations from "../api-calls/getRooms";
import { initialzeConversations } from "../features/conversationsSlice";
import { selectConversation } from "../features/selectedConversationSlice";
import { Conversation, Message, User } from "../models/chatDataModels";
import { GrAdd, GrClose } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import "../style/conversations.css";
import findUser from "../api-calls/searchUser";
import makeRoom from "../api-calls/makeRoom";
import sendMessage from "../api-calls/sendMessage";
function ConversationsPanel() {
  const userState = useAppSelector((state) => state.user);

  const state = useAppSelector((state) => state.conversations);
  const selectedConversationState = useAppSelector(
    (state) => state.selectedConversation
  );
  const [toggle, setToggle] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [users, setUsers] = useState([] as User[]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // get conversations whenuser logs in or user state changes
    if (!userState.user?.username) {
      console.log("User not logged in");
      return;
    }
    getConversations(userState.user.roomsCollectionId).then((data) => {
      dispatch(initialzeConversations(data));
    });
  }, []);

  //const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const handleClick = (conversation: Conversation) => () => {
    dispatch(selectConversation(conversation));
  };
  /*   function endStream() {
    if (eventSource) {
      eventSource.close();
    }
  } */
  const handleSearch = () => {
    setUsers(users.splice(0, users.length));
    findUser(searchField).then((data) => {
      if (data === undefined) {
        console.log("No user found");
        return;
      }
      const foundUsers: User[] = [];
      data.map((user: User) => {
        foundUsers.push(user);
      });
      // get this user from user list
      const foundUser = foundUsers.find(
        (user) => user.userId === userState.user?.userId
      );
      // remove this user form user list
      if (foundUser) {
        foundUsers.splice(foundUsers.indexOf(foundUser), 1);
      }
      setUsers(foundUsers);
    });
  };
  const handleClickOnUser = (otherUsername: string) => {
    if (userState.user == null) return;
    // made room with user
    makeRoom(userState.user?.username, otherUsername).then((data) => {
      sendMessage({
        messageCollectionId: data.newRoom.messageCollectionId,
        messageText: "Hello",
        senderName: userState.user?.username,
      } as Message).then((response) => {
        if (response.ok) {
          setSearchField("");
          setToggle(!toggle);
          dispatch(selectConversation(data.newRoom));
        } else {
          console.log("message not sent");
        }
      });

      console.log(data);
    });
  };
  return (
    <div id="chats">
      {toggle ? (
        <>
          {" "}
          <div id="top-area">
            <p>Search Friend</p>
            <GrClose id="add-icon" onClick={() => setToggle(!toggle)}></GrClose>
          </div>
          <div id="search-area">
            <input
              type="text"
              placeholder="user name"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <IoSearchOutline
              id="search-icon"
              onClick={() => {
                handleSearch();
              }}
            ></IoSearchOutline>
          </div>
          <div id="found-users-area">
            {users.map((user) => {
              return (
                <div
                  id="found-user-tile"
                  key={user.userId}
                  onClick={() => handleClickOnUser(user.username)}
                >
                  <div id="img"></div>
                  <p>{user.username}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {" "}
          <div id="top-area">
            <p>Conversations</p>
            <GrAdd id="add-icon" onClick={() => setToggle(!toggle)}></GrAdd>
          </div>
          {state.map((conversation) => {
            return (
              <div
                key={conversation.roomId}
                id={
                  selectedConversationState.roomId === conversation.roomId
                    ? "selected-conversation-tile"
                    : "conversation-tile"
                }
                onClick={handleClick(conversation)}
              >
                <div id="img"></div>
                <p>
                  {conversation.roomName
                    .split("&")
                    .find((item) => item !== userState.user?.username)}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default ConversationsPanel;
