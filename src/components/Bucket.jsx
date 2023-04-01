import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { editBucket } from "../features/bucketSlice";

const Bucket = (props) => {
  const dispatch = useDispatch();
  const [label, setlabel] = useState(props.label);
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = (value) => {
    if (value) {
      setlabel(value);
      dispatch(editBucket({ ind: props.ind, bucket: value }));
    } else {
      messageApi.open({
        type: "error",
        content: "Bucket Name cannot be Empty",
      });
    }
  };
  return (
    <div>
      {contextHolder}
      <Paragraph
        editable={{
          onChange: handleChange,
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {label}
      </Paragraph>
    </div>
  );
};

export default Bucket;
