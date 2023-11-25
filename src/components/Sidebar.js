import React from "react";
import "./Sidebar.css";

import { Avatar, List } from "antd";

const data = [
  {
    title: "John Smith 1",
  },
  {
    title: "John Smith 2",
  },
  {
    title: "John Smith 3",
  },
  {
    title: "John Smith 4",
  },
];

const SideBar = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={
            <Avatar
              src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
            />
          }
          title={<a href="https://ant.design">{item.title}</a>}
          description="I am a customer, a using for support applications, is refined by Optimus Team"
        />
      </List.Item>
    )}
  />
);

export default SideBar;
