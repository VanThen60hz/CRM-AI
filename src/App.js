import "@chatui/core/dist/index.css";
import React, { useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import SideBar from "./components/Sidebar";
import "@chatui/core/dist/index.css";
import "./App.css";
import { BoldOutlined, Row, Col } from "antd";
// import Info from "./components/Info";

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
          <div class="ChatApp">
            <header class="Navbar">
              <div class="Navbar-left"></div>
              <div class="Navbar-main">
                <h2 class="Navbar-title">Assistant chat</h2>
              </div>
              <div class="Navbar-right"></div>
            </header>
            <div class="MessageContainer" tabindex="-1">
              <div class="PullToRefresh">
                <div class="PullToRefresh-inner">
                  <div class="PullToRefresh-content">
                    <div class="PullToRefresh-indicator"></div>
                    <div class="MessageList">
                      <div
                        class="Message right"
                        data-id="blkutvfv26vi"
                        data-type="text"
                      >
                        <div class="Message-meta">
                          <time
                            class="Time"
                            datetime="2023-11-25T07:34:08.303Z"
                          >
                            {/* 14:34 */}
                          </time>
                        </div>
                        <div class="Message-main">
                          <div class="Message-inner">
                            <div
                              class="Message-content"
                              role="alert"
                              aria-live="assertive"
                              aria-atomic="false"
                            >
                              <div class="Bubble text" data-type="text"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="Message left"
                        data-id="_TYPING_"
                        data-type="typing"
                      >
                        <div class="Message-main">
                          <div class="Message-inner">
                            <div
                              class="Message-content"
                              role="alert"
                              aria-live="assertive"
                              aria-atomic="false"
                            >
                              <div class="Bubble typing" data-type="typing">
                                <div class="Typing" aria-busy="true">
                                  <div class="Typing-dot"></div>
                                  <div class="Typing-dot"></div>
                                  <div class="Typing-dot"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      {" "}
                      <i class="fa-solid fa-bold"></i>
                    </button>
                    <button type="button" class="btn btn-link text-dark">
                      {" "}
                      <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                    <textarea
                      className="Input Input--outline Composer-input"
                      type="text"
                      placeholder="Type here..."
                      rows="1"
                      enterkeyhint="send"
                      // onKeyDown={handleSend}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={4}>{/* <Info /> */}</Col>
      </Row>

      <div className="info"></div>
    </div>
  );
}
