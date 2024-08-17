import React from "react";
import { GrMenu } from "react-icons/gr";

function Appbar() {
  const handeSidebarVisibility = async () => {
    const sidebar = document.getElementById("side-drawer");

    if (sidebar) {
      if (sidebar.className === "hide") {
        console.log("showing");
        sidebar.className = "show-drawer";
      } else if (sidebar.className === "show-drawer") {
        console.log("hiding");
        sidebar.className = "hide-drawer";
        setTimeout(() => {
          sidebar.className = "hide";
        }, 290);
      }
    }
  };

  return (
    <section id="appbar-area" onClick={() => {}}>
      <GrMenu
        id="menu-icon"
        onClick={() => {
          handeSidebarVisibility();
        }}
      ></GrMenu>
    </section>
  );
}

export default Appbar;
