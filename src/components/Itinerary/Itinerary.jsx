import { CarryOutOutlined, CommentOutlined } from "@ant-design/icons";
import { Wrapper } from "../../common";
import styles from "./Itinerary.module.scss";

export const Itinerary = () => {
  return (
    <Wrapper>
      <div className={styles.content}>
        <h2>Маршрут</h2>
        <div className={styles.btns}>
          <button className={styles.btn}>
            <CommentOutlined />
          </button>
          <button className={styles.btn}>
            <CarryOutOutlined />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
