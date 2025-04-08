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
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddCunterpartyModal } from "../../components";
import { employeeInfo } from "../../utils";

export const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openCunterparty, setOpenCunterparty] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const onCloseCunterparty = () => {
    setOpenCunterparty(false);
  };

  const data = JSON.parse(localStorage.getItem("folderArr"))?.filter(
    (item) => item?.employee?.email === employeeInfo()?.email
  );

  const statusCount = data?.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  if (data) {
    localStorage.setItem("statusCount", JSON.stringify(statusCount));
  }

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
        <Flex justify="end" gap={"small"}>
          <Button type="primary" onClick={() => navigate("/add-document")}>
            <FolderAddOutlined />
            Добавить документ
          </Button>
          {/* <Button type="primary" onClick={() => setOpenCunterparty(true)}>
            <FolderAddOutlined />
            Добавить контрагента
          </Button> */}
        </Flex>

        <Flex gap="middle" justify="center" align="center" wrap>
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
      <AddCunterpartyModal
        open={openCunterparty}
        onCancel={onCloseCunterparty}
      />
    </Wrapper>
  );
};
