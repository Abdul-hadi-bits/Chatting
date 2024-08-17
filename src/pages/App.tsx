import "../style/App.css";

import ConversationsPanel from "../components/conversation-panel";
import ChattingPanel from "../components/chatting-panel";

import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/app-bar";
import SideDrawer from "../components/side-drawer";

function App() {
  /* const dispatch = useAppDispatch(); */

  const state = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const width = window.innerWidth;

  useEffect(() => {
    if (state.user == null) {
      navigate("/login");
    }
    /*  login("salim", "salim_secret").then((data) => {
      dispatch(userLogin(data));
    }); */
  }, []);

  return state.user == null ? (
    <div>redirecting...</div>
  ) : (
    <>
      <section id="container">
        <ChattingPanel></ChattingPanel>
        {width > 768 ? <ConversationsPanel></ConversationsPanel> : null}
        <SideDrawer></SideDrawer>
        <Appbar></Appbar>
      </section>
    </>
  );
}

export default App;
