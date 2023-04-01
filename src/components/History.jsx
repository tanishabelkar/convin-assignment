import React from "react";
import { selectHistory } from "../features/historySlice";
import { useSelector } from "react-redux";
import { List, Space } from "antd";

export default function History() {
  const visited = useSelector(selectHistory);
  return (
    <div style={{ paddingLeft: 25, paddingRight: 25 }}>
      <List
        itemLayout="horizontal"
        dataSource={visited}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={<a href={item.link}>{item.link}</a>}
            />
            <div>{item.watchTime}</div>
          </List.Item>
        )}
      />
    </div>
  );
}
