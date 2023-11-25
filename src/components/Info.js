import React from "react";
import { Avatar, List } from "antd";
import Link from "antd/es/typography/Link";

const Info = ({ items, selectedIndex }) => (
  <List
    itemLayout="vertical"
    size="large"
    dataSource={items}
    renderItem={(item, index) => (
      <Link>
        <List.Item
          key={index}
          style={{ display: selectedIndex === index ? "block" : "none" }}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.email}
          />
          {item.content}
        </List.Item>
      </Link>
    )}
  />
);

export default Info;
