import "@chatui/core/dist/index.css";
import React, { useState, useEffect } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import SideBar from "./components/Sidebar";
import "./App.css";
import { Row, Col } from "antd";
import Info from "./components/Info";

import axios from "axios";

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [cont, setcont] = useState("11111");

  const [buttonsAdded, setButtonsAdded] = useState(false);

  // Function to add buttons dynamically
  const addButtons = () => {
    if (!buttonsAdded) {
      const chatFooter = document.querySelector(".Composer");
      const existingButtons = chatFooter.querySelector(".inline");

      if (!existingButtons) {
        const htmlContent = `
          <div className="inline">
            <button type="button" class="btn btn-link text-dark">
              <i class="fa-solid fa-italic"></i>
            </button>
            <button type="button" class="btn btn-link text-dark">
              <i class="fa-solid fa-bold"></i>
            </button>
            <button type="button" class="btn btn-link text-dark">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
            </button>
          </div>
        `;
        chatFooter.insertAdjacentHTML("beforebegin", htmlContent);
        setButtonsAdded(true);
      }
    }
  };

  useEffect(() => {
    addButtons();
  }, []);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      axios
        .get("http://172.174.71.39:3000/chat?q=" + val + "&id=chatgptwebb", {})
        .then((res) => {
          setcont(res.data);
          setTyping(true);
        });
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <div className="app-container">
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={16}>
          <Chat
            navbar={{ title: "CRM_AI chat" }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            placeholder="Type here..."
            onSend={handleSend}
          />
        </Col>
        <Col span={4}>
          <Info />
        </Col>
      </Row>

      <div className="info"></div>
    </div>
  );
}
