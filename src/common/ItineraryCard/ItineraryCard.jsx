import { Drawer, Flex, Typography } from "antd";
import styles from "./ItineraryCard.module.scss";
import { status } from "../../enums";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DoubleLeftOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export const ItineraryCard = ({
  img,
  position,
  fio,
  date,
  statusItinerary,
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const color = (() => {
    switch (statusItinerary) {
      case status.APPROVED:
        return "#f6ffed";
      case status.REJECTED:
        return "#fff2f0";
      case status.IN_PROCESS:
        return "#e6f4ff";
      case status.DRAFT:
        return "rgba(0, 0, 0, 0.04)";
      case status.REVISION:
        return "#feffe6";
      default:
        return "";
    }
  })();

  const icon = (() => {
    switch (statusItinerary) {
      case status.APPROVED:
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case status.REJECTED:
        return <CloseCircleOutlined style={{ color: "#ff4d4f" }} />;
      case status.IN_PROCESS:
        return <SyncOutlined style={{ color: "#1890ff" }} />;
      case status.DRAFT:
        return <FileTextOutlined style={{ color: "#8c8c8c" }} />;
      case status.REVISION:
        return <ExclamationCircleOutlined style={{ color: "#faad14" }} />;
      default:
        return <DoubleLeftOutlined style={{ transform: "rotate(-90deg)" }} />;
    }
  })();

  return (
    <>
      <Flex
        vertical
        gap={"small"}
        align="center"
        className={styles.card}
        style={{ background: color }}
        onClick={() => showDrawer()}
      >
        {icon}
        <img src={img} alt="user foto" className={styles.img} />
        <Typography.Text>{position}</Typography.Text>
        <Flex vertical gap={"small"}>
          <Typography.Text>{fio}</Typography.Text>
          <Typography.Text>{date}</Typography.Text>
        </Flex>
      </Flex>
      <Drawer title="Комметарий" onClose={onClose} open={open}></Drawer>
    </>
  );
};
