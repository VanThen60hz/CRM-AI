import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, List, Space } from "antd";

const data = Array.from({ length: 1 }).map((_, i) => ({
  href: "https://ant.design",
  title: `John Smith ${i + 1}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description: "johnsmith@gmail.com",
  content:
    "John Smith, a customer for CRM_AI applications, is refined by Optimus Team.",
}));

const Info = () => (
  <List
    itemLayout="vertical"
    size="large"
    dataSource={data}
    renderItem={(item) => (
      <List.Item key={item.title}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);

export default Info;
