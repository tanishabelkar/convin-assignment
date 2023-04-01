import React from "react";
import { Input, Menu, Tooltip, message } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import {
  selectActiveBucket,
  currentBucket,
  selectBucketLabels,
  createNewBucket,
} from "../features/bucketSlice";
import { useSelector, useDispatch } from "react-redux";
import Bucket from "./Bucket";

const Sidebar = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const active = useSelector(selectActiveBucket);
  const bucketLabels = useSelector(selectBucketLabels);
  const items = bucketLabels.map((b, i) => ({
    label: <Bucket label={b.label} ind={i} />,
    value: b.value,
    key: b.key,
  }));

  bucketLabels.push({
    label: (
      <Input
        placeholder="New Bucket"
        suffix={
          <Tooltip title="Press Enter to create a bucket">
            <EnterOutlined />
          </Tooltip>
        }
        bordered={false}
        onPressEnter={(e) => {
          const value = e.target.value,
            BL = bucketLabels.map((b) => b.label);
          //console.log(BL.includes(value))
          if (BL.includes(value)) {
            messageApi.open({
              type: "error",
              content: "This bucket already exists!",
            });
          } else {
            dispatch(createNewBucket(value));
          }
          //console.log(e.target)
        }}
      ></Input>
    ),
    key: "newBucket",
    value: "new Bucket",
  });
  const dispatch = useDispatch();
  return (
    <div>
      {contextHolder}
      <Menu
        onClick={(e) => {
          if (e.key !== "newBucket") {
            console.log(e.key);
            dispatch(currentBucket(Number(e.key)));
          }
        }}
        style={{
          width: "30vh",
          height: "100vh",
        }}
        selectedKeys={[String(active)]}
        mode="vertical"
        items={items}
      />
    </div>
  );
};

export default Sidebar;
