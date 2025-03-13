import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./StatusButton.module.scss";
import { Button } from "antd";
import { status } from "../../enums";

export const StatusButton = ({
  children,
  icon,
  statusFolder,
  source,
}) => {

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

  return (
    <div className={styles.content}>
      <Button
        color={color}
        variant="filled"
        className={source !== "table" ? styles.btn : styles.btn_table}
        icon={icon}
      >
        {children}
      </Button>
    </div>
  );
};
