import React from "react";
import ConversationsPanel from "./conversation-panel";

function SideDrawer() {
  return (
    <div id="side-drawer" className="hide">
      <ConversationsPanel></ConversationsPanel>
    </div>
  );
}

export default SideDrawer;
