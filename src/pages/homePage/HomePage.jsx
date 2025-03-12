import { Button, Flex } from "antd";
import { CustomTable, Filter, Itinerary } from "../../components";
import styles from "./HomePage.module.scss";
import { CustomSidebar } from "../../common";

export const HomePage = () => {
  return (
    <main>
      <div className={`${styles.home} container`}>
        {/* <CustomSidebar /> */}
        {/* <Filter /> */}
        <CustomTable />
        {/* <Itinerary /> */}
      </div>
    </main>
  );
};
