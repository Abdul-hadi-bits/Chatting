async function findUser(username: string) {
  const response = await fetch(
    `http://localhost:3000/chat/searchUser/${username}`
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to search for user");
  }
}

export default findUser;
