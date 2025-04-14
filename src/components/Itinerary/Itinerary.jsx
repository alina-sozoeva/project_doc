import { CarryOutOutlined, CommentOutlined } from "@ant-design/icons";
import { ItineraryCard, Wrapper } from "../../common";
import { Flex } from "antd";
import { useParams } from "react-router-dom";
import { getStepDataList } from "../../utils";
import { useSelector } from "react-redux";
import styles from "./Itinerary.module.scss";

export const Itinerary = () => {
  const { id } = useParams();
  const data = getStepDataList();
  const documentsArr = useSelector((state) => state.documents.documentsArr);

  const objFilter = documentsArr?.find((item) => item.guid === id);

  const filteredData = data?.filter(
    (item) => item.title === objFilter?.process
  );

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
      <div className={styles.scrollContainer}>
        <Flex vertical gap={"middle"}>
          {filteredData &&
            filteredData[0]?.members?.map((item, index) => {
              return <ItineraryCard key={item.id} item={item} index={index} />;
            })}
        </Flex>
      </div>
    </Wrapper>
  );
};
