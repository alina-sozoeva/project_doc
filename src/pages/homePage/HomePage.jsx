import { Button, Flex } from "antd";
import { CustomTable, Filter, Itinerary } from "../../components";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <main className="basic">
      <div className={`${styles.home} container`}>
        <Filter />
        <CustomTable />
        <Itinerary />
      </div>
    </main>
  );
};
