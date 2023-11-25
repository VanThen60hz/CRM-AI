import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, List } from "antd";
import Link from "antd/es/typography/Link";

const SideBar = ({ data, onItemClicked }) => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(index);
    onItemClicked(index);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <Link
          to={`/profile/${index}`}
          className={`sidebar-link ${clickedIndex === index ? "clicked" : ""}`}
          onClick={() => handleClick(index)}
        >
          <List.Item className="sidebar-button">
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        </Link>
      )}
    />
  );
};

export default SideBar;
