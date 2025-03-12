import { useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import { pages, pathname } from "../../enums";

export const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState("Главная");

  useEffect(() => {
    const key = Object.keys(pathname).find(
      (key) => pathname[key] === location.pathname
    );
    if (key) {
      setTitle(pages[key]);
    }
  }, [location, title]);

  return (
    <header className={styles.header}>
      <div className={`${styles.nav} container`}>
        <Typography.Title level={3}>{title}</Typography.Title>
        <div className={styles.nav_list}>
          <img
            src="http://docs.icloud.kg/image/avatar/28.jpg"
            alt="user foto"
            className={styles.user_foto}
          />
          <p>Name</p>
        </div>
      </div>
    </header>
  );
};
