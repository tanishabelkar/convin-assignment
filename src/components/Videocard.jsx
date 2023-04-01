import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Checkbox, Modal, Select } from "antd";
import { historySlice } from "../features/historySlice";
import {
  deleteVideo,
  moveVideo,
  selectBucketLabels,
} from "../features/bucketSlice";

function Videocard(props) {
  console.log(props);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const B = useSelector(selectBucketLabels).filter((_, i) => {
    // console.log(i);
    // console.log(props.bucket);
    return i !== props.bucket;
  });
  const showModal = () => {
    setIsModalOpen(true);
    const date = new Date();
    dispatch(
      historySlice.actions.addToHistory({
        title: props.title,
        link: "https://youtu.be/" + props.id,
        watchTime: "Watched at " + date.getHours() + ":" + date.getMinutes(),
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteVideo({ inds: [Number(props.index)], label: props.bucket }));
    setIsModalOpen(false);
  };

  const handleMove = (value) => {
    console.log(value);
    dispatch(
      moveVideo({
        inds: [Number(props.index)],
        labelTo: value,
        labelFrom: props.bucket,
      })
    );
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (e) => {
    let newArr = props.selected;
    newArr[props.index] = !newArr[props.index];
    props.setSelected(newArr);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="link" onClick={showModal}>
        <Card
          hoverable
          style={{ width: 300, marginTop: 10 }}
          title={props.title}
          extra={<Checkbox onChange={handleSelect}></Checkbox>}
        >
          {"https://youtu.be/" + props.id}
        </Card>
      </Button>
      <Modal
        title={props.title}
        onCancel={handleCancel}
        open={isModalOpen}
        footer={[
          <Select
            defaultValue="Move to"
            options={B}
            style={{ width: 100 }}
            onChange={handleMove}
          ></Select>,
          <Button key="delete" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <iframe
          id={"player " + props.key}
          width="448"
          height="252"
          src={"https://www.youtube.com/embed/" + props.id}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </Modal>
    </div>
  );
}

export default Videocard;
