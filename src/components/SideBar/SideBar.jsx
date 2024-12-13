import React from "react";
import "./SideBar.css";
import avatar from "../../assets/sidebar__Avatar.png";

function SideBar({ userName }) {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">{userName}</p>
    </div>
  );
}

export default SideBar;
