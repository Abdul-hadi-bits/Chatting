async function makeRoom(userName: string, otherUserName: string) {
  const response = await fetch(`http://localhost:3000/chat/createRoom`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userName,
      otherUser: otherUserName,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
}

export default makeRoom;
