import styles from "./FilterButton.module.scss";
import { Button } from "antd";

export const FilterButton = ({ children, icon, onClick  }) => {
  return (
    <Button
      color="default"
      variant="filled"
      className={styles.btn}
      onClick={onClick}
    >
      {icon}
      <p> {children}</p>
    </Button>
  );
};
