import { CarryOutOutlined, CommentOutlined } from "@ant-design/icons";
import { ItineraryCard, Wrapper } from "../../common";
import styles from "./Itinerary.module.scss";
import { Flex } from "antd";
import { status } from "../../enums";
import foto from "../../assets/icon-5359553_1280.webp";

const data = [
  {
    img: foto,
    position: "Project Manager",
    fio: "Leon Kennady",
    date: "2025-03-15",
    status: "",
  },
  {
    img: foto,
    position: "Frontend Developer",
    fio: "Leon Kennady",
    date: "2025-03-18",
    status: status.APPROVED,
  },
  {
    img: foto,
    position: "Backend Developer",
    fio: "Leon Kennady",
    date: "2025-03-17",
    status: status.REJECTED,
  },
  {
    img: foto,
    position: "UI/UX Designer",
    fio: "Leon Kennady",
    date: "2025-03-16",
    status: status.IN_PROCESS,
  },
  {
    img: foto,
    position: "Project Manager",
    fio: "Leon Kennady",
    date: "2025-03-15",
    status: status.DRAFT,
  },
  {
    img: foto,
    position: "Project Manager",
    fio: "Leon Kennady",
    date: "2025-03-15",
    status: status.REVISION,
  },
];

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
      <div className={styles.scrollContainer}>
        <Flex vertical gap={"middle"}>
          {data.map((item) => (
            <ItineraryCard
              img={item.img}
              fio={item.fio}
              position={item.position}
              date={item.date}
              statusItinerary={item.status}
            />
          ))}
        </Flex>
      </div>
    </Wrapper>
  );
};
