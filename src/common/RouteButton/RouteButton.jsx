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

  console.log(item);

  return (
    <Tooltip
      title={
        <Flex vertical>
          <p>Testov Test Testovich</p>
          <p>test@gmail.com</p>
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
