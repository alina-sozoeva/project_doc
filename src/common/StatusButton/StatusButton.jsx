import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./StatusButton.module.scss";
import { Button, Flex } from "antd";
import { status } from "../../enums";

export const StatusButton = ({ children, icon, typeIcon, statusFolder }) => {
  const isTypeIcon = typeIcon === "plus" ? <PlusOutlined /> : <CloseOutlined />;
  
  const color = (() => {
    switch (statusFolder) {
      case status.APPROVED:
        return "green";
      case status.REJECTED:
        return "danger";
      default:
        return "";
    }
  })();

  return (
    <Flex gap="small" wrap>
      <Button
        color={color}
        variant="filled"
        className={styles.btn}
        icon={icon ? isTypeIcon : false}
      >
        {children}
      </Button>
    </Flex>
  );
};
