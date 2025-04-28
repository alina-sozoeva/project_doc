import styles from "./RouteButton.module.scss";
import { Button, Flex, Tooltip } from "antd";
import { status } from "../../enums";
import foto from "../../assets/foto.jpg";
import { useGetEmployeesQuery } from "../../store";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DoubleLeftOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  SyncOutlined,
} from "@ant-design/icons";

export const RouteButton = ({ children, statusFolder, onClick, item }) => {
  const color = (() => {
    switch (statusFolder) {
      case status.APPROVED:
        return "green";
      case status.REJECTED:
        return "danger";
      case status.IN_PROCESS:
        return "blue";
      case status.DRAFT:
        return "default";
      case status.REVISION:
        return "yellow";
      default:
        return "";
    }
  })();

  const icon = (() => {
    switch (statusFolder) {
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

  const { data } = useGetEmployeesQuery();

  const filtered = data?.data?.find((i) => i?.guid === item?.employee_id);

  return (
    <Tooltip
      title={
        <Flex vertical align="center">
          {item ? (
            <>
              <img src={foto} alt="" style={{ width: "40px" }} />
              <p>{filtered?.fio}</p>
              <p>{filtered?.email}</p>
            </>
          ) : (
            "Нет данных"
          )}
        </Flex>
      }
    >
      <div className={styles.content}>
        <Button
          className={styles.btn}
          color={color}
          variant="filled"
          onClick={onClick}
          icon={icon}
        >
          {/* <img src={foto} alt="" /> */}
          {children}
        </Button>
      </div>
    </Tooltip>
  );
};
