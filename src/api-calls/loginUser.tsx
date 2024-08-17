async function login(username: string, password: string) {
  const response = await fetch("http://localhost:3000/chat/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName: username, password: password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.user;
  } else {
    alert("Failed to login");
  }
}

export default login;
