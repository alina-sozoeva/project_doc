import { BellFilled, LogoutOutlined } from "@ant-design/icons";
import styles from "./Header.module.scss";
import { EmployeesDrawer } from "../EmployeesDrawer";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [openEmploe, setOpenEmploe] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`${styles.nav} container`}>
        <p>
          {/* <img
            src="http://docs.icloud.kg/image/logo.png"
            alt="logo"
            className={styles.nav_logo}
          /> */}
          Все документы
        </p>
        <div className={styles.nav_list}>
          {/* <button
            className={styles.nav_btn}
            onClick={() => setOpenEmploe(true)}
          >
            <p className={styles.empl}>Список сотрудников</p>
          </button> */}
          {/* <button className={styles.nav_btn}>
            <BellFilled className={styles.mess} />
          </button> */}
          <img
            src="http://docs.icloud.kg/image/avatar/28.jpg"
            alt="user foto"
            className={styles.user_foto}
          />
          <p>Name</p>
          {/* <button className={styles.nav_btn}>
            с
          </button> */}
        </div>
      </div>
      {/* <EmployeesDrawer
        openEmploe={openEmploe}
        onOpenEmploe={() => setOpenEmploe(false)}
      /> */}
    </header>
  );
};
