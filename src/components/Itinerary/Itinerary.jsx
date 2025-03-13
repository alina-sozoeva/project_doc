import { CarryOutOutlined, CommentOutlined } from "@ant-design/icons";
import { Wrapper } from "../../common";
import styles from "./Itinerary.module.scss";
import { Flex } from "antd";

export const Itinerary = () => {
  return (
    <Wrapper className={styles.content}>
      <Flex vertical align="center" gap={"small"}>
        <h2>Маршрут</h2>
        <div className={styles.btns}>
          <button className={styles.btn}>
            <CommentOutlined />
          </button>
          <button className={styles.btn}>
            <CarryOutOutlined />
          </button>
        </div>
      </Flex>

      <Flex>Маршрут документа</Flex>
    </Wrapper>
  );
};
