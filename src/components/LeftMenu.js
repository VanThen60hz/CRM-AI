import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faComment } from "@fortawesome/free-solid-svg-icons";
import "./LeftMenu.css";

const LeftMenu = () => {
  return (
    <div className="left-menu">
      <div className="chat-icon">
        {/* <FontAwesomeIcon icon={faTelegram} /> */}
      </div>
      <div className="chat-icon">
        <FontAwesomeIcon icon={faComment} />
      </div>
    </div>
  );
};

export default LeftMenu;
