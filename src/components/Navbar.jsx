import React, { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, HistoryOutlined, FileAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      key: "Homepage",
      icon: <HomeOutlined />,
    },
    { label: "History", key: "History", icon: <HistoryOutlined /> },
    {
      label: "Add New",
      key: "addVideo",
      icon: <FileAddOutlined />
    },
  ];
  const [curr, setCurr] = useState("Homepage");
  const onClick = (e) => {
    setCurr(e.key);
    if (e.key !== "Homepage") navigate("/" + e.key);
    else navigate("/");
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[curr]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
