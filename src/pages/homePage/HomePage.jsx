import { Button, Flex, Input } from "antd";
import { CustomCard, FolderModal, Wrapper } from "../../common";
import { pathname, status } from "../../enums";
import styles from "./HomePage.module.scss";
import {
  FileDoneOutlined,
  FileExcelOutlined,
  FileExclamationOutlined,
  FileSyncOutlined,
  FileTextOutlined,
  FolderAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export const HomePage = () => {
  const [open, setOpen] = useState(false);
  const statusCount = JSON.parse(localStorage.getItem("statusCount"));

  const onClose = () => {
    setOpen(false);
  };

  const filteredStatus = (status) => {
    localStorage.setItem("filteredStatus", status);
  };

  const folderArr = [
    {
      key: 1,
      title: "Одобренные",
      backgroundColor: "rgba(142, 255, 30, 0.08)",
      status: status.APPROVED,
      icon: <FileDoneOutlined style={{ color: "#7CB342" }} />,
      count: statusCount ? statusCount[status.APPROVED] : null,
    },
    {
      key: 2,
      title: "Отклоненные",
      backgroundColor: "rgba(255, 5, 105, 0.06)",
      status: status.REJECTED,
      icon: <FileExcelOutlined style={{ color: "#D32F2F" }} />,
      count: statusCount ? statusCount[status.REJECTED] : null,
    },
    {
      key: 3,
      title: "В процессе",
      backgroundColor: "rgba(5, 255, 215, 0.1)",
      status: status.IN_PROCESS,
      icon: <FileSyncOutlined style={{ color: "#0288D1" }} />,
      count: statusCount ? statusCount[status.IN_PROCESS] : null,
    },
    {
      key: 4,
      title: "Черновики",
      backgroundColor: "rgba(48, 46, 50, 0.06)",
      status: status.DRAFT,
      icon: <FileTextOutlined style={{ color: "#757575" }} />,
      count: statusCount ? statusCount[status.DRAFT] : null,
    },
    {
      key: 5,
      title: "На доработке",
      backgroundColor: "rgba(245, 255, 5, 0.1)",
      status: status.REVISION,
      icon: <FileExclamationOutlined style={{ color: "#FFA000" }} />,
      count: statusCount ? statusCount[status.REVISION] : null,
    },
  ];

  return (
    <Wrapper path={pathname.HOME} page={true} className={styles.home}>
      <Flex vertical gap={"small"}>
        <Flex justify="space-between">
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{
              width: "20%",
            }}
          />
          <Button type="primary" onClick={() => setOpen(true)}>
            <FolderAddOutlined />
            Добавить документ
          </Button>
        </Flex>

        <Flex gap="middle" align="center" wrap>
          {folderArr?.map((item) => (
            <CustomCard
              title={item.title}
              count={item.count}
              backgroundColor={item.backgroundColor}
              icon={item.icon}
              onClick={() => filteredStatus(item.status)}
              path={pathname.DOCUMENTS}
            />
          ))}
        </Flex>
      </Flex>

      <FolderModal open={open} onCancel={onClose} />
    </Wrapper>
  );
};
