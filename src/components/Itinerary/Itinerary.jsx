import { CarryOutOutlined, CommentOutlined } from "@ant-design/icons";
import { ItineraryCard, Wrapper } from "../../common";
import { Flex } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Itinerary.module.scss";

export const Itinerary = () => {
  const { id } = useParams();
  const processesMembers = useSelector(
    (state) => state.processes.processesMembers
  );
  const documents = useSelector((state) => state.documents.documents);

  const objFilter = documents?.find((item) => item.guid === id);

  const filteredData = processesMembers?.filter(
    (item) => item.process_id === objFilter?.process_id
  );

  console.log(filteredData);

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
            filteredData?.map((item, index) => {
              return <ItineraryCard key={item.id} item={item} index={index} />;
            })}
        </Flex>
      </div>
    </Wrapper>
  );
};
