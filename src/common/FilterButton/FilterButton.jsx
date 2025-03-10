import { Flex } from "antd";
import { Button } from "antd";
import styles from "./FilterButton.module.scss";

export const FilterButton = ({ children, icon }) => {
  return (
    <Flex gap="small" wrap>
      <Button color="default" variant="filled" className={styles.btn}>
        {icon}
        <p> {children}</p>
      </Button>
    </Flex>
  );
};
