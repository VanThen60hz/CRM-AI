import "@chatui/core/dist/index.css";
import React, { useState, useEffect } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import SideBar from "./components/Sidebar";
import "./App.css";
import { Row, Col, Input, Button, notification, Form } from "antd";
import Info from "./components/Info";

import axios from "axios";
// import { send } from "process";

export default function App() {
  const { messages, appendMsg, setTyping } = useMessages([]);
  const [email, setEmail] = useState("luutungbca@gmail.com");
  const [cont, setcont] = useState("11111");

  const [buttonsAdded, setButtonsAdded] = useState(false);
  const [api, contextHolder] = notification.useNotification();

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

  const getdata = (val) => {
    axios
      .get("http://172.174.71.39:3000/chat?q=" + val + "&id=chatgptwebb", {})
      .then((res) => {
        console.log(res.data);
        console.log("data", cont);
        setcont(res.data);
      });
  };

  // Mock response from the backend API
  // const mockApiResponse = {
  //   type: "text",
  //   content: {
  //     text: "This is the response from the backend API. It contains information or answers related to the user's question.",
  //   },
  //   position: "left",
  // };

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const data = [
    {
      title: "GDSC WEB",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=0",
      description:
        "I am a customer, a user for support applications, refined by Optimus Team",
      content: "Additional content for GDSCWEB",
      email: "gdscweb@gmail.com",
    },
    {
      title: "Van Thang",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
      description:
        "I am a customer, a user for support applications, refined by Optimus Team",
      content: "Additional content for John Smith 2.",
      email: "nguyenvthang2409@gmail.com",
    },
    // Add more users here
    {
      title: "GDSC GAME",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
      description:
        "I am a customer, a user for support applications, refined by Optimus Team",
      content: "Additional content for John Smith 3.",
      email: "gdscgame@gmail.com",
    },
  ];

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const fetchEmail = async (val, email) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:5000/send_email?receiver_email=${email}` +
          "&question=" +
          val,
        {
          message: val,
        }
      );
      setTimeout(() => {
        console.log("data_now", cont);
        appendMsg({
          type: "text",
          content: { text: res.data },
        });
      }, 100);
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  };

  // Inside your component, use this mock response in your `handleSend` function:

  const sendEmail = async (val) => {
    try {
      fetchEmail(val, email);
      // Send email

      api.open({
        message: "Send email successfully",
        description: "You can check your email to get your answer",
      });
    } catch (error) {
      console.error("Error sending message to Flask API:", error);
    }
  };

  const handleSend = (type, val) => {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });
      // fetchEmail(val, email);

      sendEmail(val);
    }
  };

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <div className="app-container">
      {contextHolder}
      <Row>
        <Col span={4}>
          <SideBar data={data} onItemClicked={handleItemClick} />
        </Col>
        <Col span={14}>
          <Chat
            navbar={{ title: "CRM_AI chat" }}
            messages={messages}
            renderMessageContent={renderMessageContent}
            placeholder="Type here..."
            onSend={handleSend}
          />
        </Col>
        <Col span={6}>
          <Info items={data} selectedIndex={selectedItemIndex} />
        </Col>
      </Row>

      <div className="info"></div>
    </div>
  );
}
