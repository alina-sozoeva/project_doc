import { CarryOutOutlined, CommentOutlined } from "@ant-design/icons";
import { ItineraryCard, Wrapper } from "../../common";
import styles from "./Itinerary.module.scss";
import { Flex } from "antd";
import { departmentMap, positionMap, status } from "../../enums";
import foto from "../../assets/icon-5359553_1280.webp";
import { useParams } from "react-router-dom";

const data = JSON.parse(localStorage.getItem("stepDataList"));
const obj = JSON.parse(localStorage.getItem("folderArr"));

export const Itinerary = () => {
  const { id } = useParams();

  const objFilter = obj?.find((item) => item.guid === id);

  console.log(data);
  console.log(obj);

  const filteredData = data?.filter(
    (item) => item.title === objFilter?.process
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
            filteredData[0]?.members?.map((item, index) => {
              return (
                <ItineraryCard
                  key={item.id}
                  img={foto}
                  fio={departmentMap[item[`step${index}_department`]]}
                  position={positionMap[item[`step${index}_position`]]}
                  date={item.date}
                  statusItinerary={item.status}
                />
              );
            })}
        </Flex>
      </div>
    </Wrapper>
  );
};
