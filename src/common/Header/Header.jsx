import { useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Button, Flex, Typography } from "antd";
import { pages, pathname } from "../../enums";
import { BellOutlined } from "@ant-design/icons";
import foto from "../../assets/28.jpg";

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
      <Flex
        align="center"
        justify="space-between"
        className={`${styles.nav} container`}
        style={{ height: "100%" }}
      >
        <Typography.Title level={3}>{title}</Typography.Title>
        <Flex gap={"small"} align="center" className={styles.nav_list}>
          <Flex vertical style={{ height: "100%" }}>
            <Button type="primary">Уведомления</Button>
          </Flex>

          <Flex align="center" gap={"small"}>
            <img src={foto} alt="user foto" className={styles.user_foto} />
            <p>Name</p>
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};
