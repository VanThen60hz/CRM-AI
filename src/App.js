import "@chatui/core/dist/index.css";
import React, { useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import SideBar from "./components/Sidebar";
import "@chatui/core/dist/index.css";
import "./App.css";
import { BoldOutlined, Row, Col } from "antd";
import Info from "./components/Info";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [cont, setcont] = useState("11111");
  const getdata = (val) => {
    axios
      .get("http://172.174.71.39:3000/chat?q=" + val + "&id=chatgptwebb", {})
      .then((res) => {
        console.log(res.data);
        console.log("data", cont);
        setcont(res.data);
      });
  };

  function handleSend() {
    const messageInput = document.getElementById("messageInput");
    const messageContent = messageInput.value.trim();

    if (messageContent !== "") {
      // Add logic to handle sending the message
      // For example, you can append the message to the MessageContainer
      const messageContainer = document.querySelector(".MessageContainer");
      const newMessage = createMessageElement(messageContent, "right");
      messageContainer.appendChild(newMessage);

      // Clear the input field
      messageInput.value = "";
    }
  }

  function createMessageElement(content, position) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("Message", position);

    // Add the message content to the Bubble
    const bubbleElement = document.createElement("div");
    bubbleElement.classList.add("Bubble", "text");
    bubbleElement.innerText = content;

    // Add the Bubble to the Message
    const messageContentElement = document.createElement("div");
    messageContentElement.classList.add("Message-content");
    messageContentElement.appendChild(bubbleElement);

    // Add the Message-content to the Message-inner
    const messageInnerElement = document.createElement("div");
    messageInnerElement.classList.add("Message-inner");
    messageInnerElement.appendChild(messageContentElement);

    // Add the Message-inner to the Message-main
    const messageMainElement = document.createElement("div");
    messageMainElement.classList.add("Message-main");
    messageMainElement.appendChild(messageInnerElement);

    // Add the Time element to the Message-meta if needed

    // Assemble all parts into the Message
    messageElement.appendChild(messageMainElement);

    return messageElement;
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
          {/* <Chat
            navbar={{ title: "CMR_AI chat" }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            placeholder="Type here..."
            onSend={handleSend}
          /> */}
          <div class="ChatApp">
            <header class="Navbar">
              <div class="Navbar-left"></div>
              <div class="Navbar-main">
                <h2 class="Navbar-title">CRM_AI chat</h2>
              </div>
              <div class="Navbar-right"></div>
            </header>
            <div
              className="MessageContainer"
              style={{
                marginRight: "2.5%",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "auto",
              }}
              tabIndex="-1"
            >
              <div
                id="messageList"
                className="MessageList"
                style={{ overflow: "auto", flex: "1" }}
              >
                {/* Messages will be appended here */}
              </div>
            </div>

            <div class="ChatFooter">
              <div class="Composer">
                <div class="Composer-inputWrap">
                  <div class="">
                    <button type="button" class="btn btn-link text-dark">
                      <i class="fa-solid fa-italic"></i>
                    </button>
                    <button type="button" class="btn btn-link text-dark">
                      <i class="fa-solid fa-bold"></i>
                    </button>
                    <button type="button" class="btn btn-link text-dark">
                      <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                    <textarea
                      className="Input Input--outline Composer-input"
                      type="text"
                      placeholder="Type here..."
                      rows="1"
                      enterkeyhint="send"
                      id="messageInput"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    ></textarea>
                    <button
                      style={{ display: "none" }}
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSend}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={4}>
          <Info />
        </Col>
      </Row>

      <div className="info"></div>
    </div>
  );
}
