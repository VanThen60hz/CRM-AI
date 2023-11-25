import "@chatui/core/dist/index.css";
import React, { useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import SideBar from "./components/Sidebar";
import "@chatui/core/dist/index.css";
import "./App.css";
import { Row, Col } from "antd";

import axios from "axios";
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
  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });
      // getdata(val);
      axios
        .get("http://172.174.71.39:3000/chat?q=" + val + "&id=chatgptwebb", {})
        .then((res) => {
          console.log(res.data);
          console.log("data", cont);
          setcont(res.data);
          setTimeout(() => {
            console.log("data_now", cont);
            appendMsg({
              type: "text",
              content: { text: res.data },
            });
          }, 1000);
        });
      setTyping(true);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <div className="app-container">
      <div className="d-f">
        <Row>
          <Col span={4}>
            <SideBar />
          </Col>
          <Col span={16}>
            <Chat
              navbar={{ title: "Assistant chat" }}
              messages={messages}
              renderMessageContent={renderMessageContent}
              placeholder="Type here..."
              onSend={handleSend}
            />
          </Col>
          <Col span={4}></Col>
        </Row>
      </div>

      <div className="info"></div>
    </div>
  );
}
