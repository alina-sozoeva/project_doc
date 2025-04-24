import styles from "./RouteButton.module.scss";
import { Button, Flex, Tooltip } from "antd";
import { status } from "../../enums";

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

  return (
    <Tooltip
      title={
        <Flex vertical>
          {item ? (
            <>
              <p>{item?.employee_id}</p>
              <p>{item?.position}</p>
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
        >
          {children}
        </Button>
      </div>
    </Tooltip>
  );
};
