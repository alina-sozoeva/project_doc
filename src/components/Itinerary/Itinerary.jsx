import { CarryOutOutlined, CommentOutlined } from "@ant-design/icons";
import { ItineraryCard, Wrapper } from "../../common";
import styles from "./Itinerary.module.scss";
import { Flex } from "antd";
import { departmentMap, positionMap, status } from "../../enums";
import foto from "../../assets/icon-5359553_1280.webp";
import { useParams } from "react-router-dom";

// const data = [
//   {
//     img: foto,
//     position: "Project Manager",
//     fio: "Leon Kennady",
//     date: "2025-03-15",
//     status: "",
//   },
//   {
//     img: foto,
//     position: "Frontend Developer",
//     fio: "Leon Kennady",
//     date: "2025-03-18",
//     status: status.APPROVED,
//   },
//   {
//     img: foto,
//     position: "Backend Developer",
//     fio: "Leon Kennady",
//     date: "2025-03-17",
//     status: status.REJECTED,
//   },
//   {
//     img: foto,
//     position: "UI/UX Designer",
//     fio: "Leon Kennady",
//     date: "2025-03-16",
//     status: status.IN_PROCESS,
//   },
//   {
//     img: foto,
//     position: "Project Manager",
//     fio: "Leon Kennady",
//     date: "2025-03-15",
//     status: status.DRAFT,
//   },
//   {
//     img: foto,
//     position: "Project Manager",
//     fio: "Leon Kennady",
//     date: "2025-03-15",
//     status: status.REVISION,
//   },
// ];

const data = JSON.parse(localStorage.getItem("stepDataList"));
const obj = JSON.parse(localStorage.getItem("folderArr"));

export const Itinerary = () => {
  const { id } = useParams();

  const objFilter = obj?.find((item) => item.guid === id);

  const filteredData = data?.filter((item) => item.title === objFilter.process);

  console.log(filteredData[0]?.steps[0].step0_position);

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
          {filteredData[0]?.steps?.map((item, index) => {
            console.log(`step${index}_position`);

            return (
              <ItineraryCard
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
