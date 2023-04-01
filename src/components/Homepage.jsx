import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteOutlined, MoreOutlined } from "@ant-design/icons/lib/icons";
import { FloatButton, Space } from "antd";
import Sidebar from "./Sidebar";
import Videocard from "./Videocard";
import {
  selectBuckets,
  selectActiveBucket,
  deleteVideo,
} from "../features/bucketSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  const active = useSelector(selectActiveBucket);
  const buckets = useSelector(selectBuckets);
  let arr = new Array(buckets[active - 1].videos.length);
  arr.fill(false, 0, -1);
  const [selected, setSelected] = useState(arr);

  const handleDelete = () => {
    let inds = [];
    selected.forEach((x, i) => {
      if (x) inds.push(i);
    });
    console.log(inds);
    dispatch(
      deleteVideo({
        inds: inds,
        label: active - 1,
      })
    );
  };

  return (
    <div>
      <Space
        style={{
          display: "flex",
          padding: 10,
          alignItems: "flex-start",
        }}
      >
        <Sidebar />
        <Space.Compact block>
          {buckets[active - 1].videos.map((v, i) => {
            console.log(v);
            return (
              <Videocard
                key={i}
                index={i}
                id={v.link}
                title={v.title}
                bucket={active - 1}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}

          <FloatButton.Group
            trigger="click"
            type="primary"
            style={{
              right: 24,
            }}
            icon={<MoreOutlined />}
          >
            <FloatButton
              tooltip="Delete Cards"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            />
          </FloatButton.Group>
        </Space.Compact>
      </Space>
    </div>
  );
};

export default Homepage;
