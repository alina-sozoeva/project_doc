import { Drawer, Flex, Typography } from "antd";
import { departmentMap, positionMap, status } from "../../enums";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DoubleLeftOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import styles from "./ItineraryCard.module.scss";
import foto from "../../assets/icon-5359553_1280.webp";

export const ItineraryCard = ({ key, item, index }) => {
  const [open, setOpen] = useState(false);

  console.log(item);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const color = (() => {
    switch (item.status) {
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
    switch (item.status) {
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
        key={key}
      >
        {icon}
        <img src={foto} alt="user foto" className={styles.img} />
        <Flex vertical gap={"small"} align="center">
          <Typography.Text>
            {positionMap[item[`step${index}_position`]]}
          </Typography.Text>
          <Typography.Text>
            {departmentMap[item[`step${index}_department`]]}
          </Typography.Text>
        </Flex>
      </Flex>
      <Drawer title="Комметарий" onClose={onClose} open={open}></Drawer>
    </>
  );
};
