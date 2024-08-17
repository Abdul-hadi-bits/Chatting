import { RegisterUser } from "../models/chatDataModels";

async function registerUser(user: RegisterUser) {
  try {
    const response = await fetch(`http://localhost:3000/chat/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    alert("Failed to register user");
  } catch (err) {
    console.log(err);
  }
}

export default registerUser;
