import { CloseOutlined, FolderOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import styles from "./DocumentButton.module.scss";

export const DocumentButton = ({ children, onClick }) => {
  return (
    <div className={styles.content}>
      <Button
        color="default"
        variant="filled"
        className={styles.btn}
        onClick={onClick}
      >
        <FolderOutlined />
        <p> {children}</p>
      </Button>
      {/* <div className={styles.act}>
        <PlusOutlined className={styles.plus} />
        <CloseOutlined className={styles.close} />
      </div> */}
    </div>
  );
};
