import { CloseOutlined, FolderOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./FolderButton.module.scss";
import { Button, Flex } from "antd";

export const FolderButton = ({ children }) => {
  return (
    <Flex gap="small" wrap className={styles.content}>
      <Button color="default" variant="filled" className={styles.btn}>
        <FolderOutlined />
        <p> {children}</p>
      </Button>
      <div className={styles.act}>
        <PlusOutlined className={styles.plus} />
        <CloseOutlined className={styles.close} />
      </div>
    </Flex>
  );
};
