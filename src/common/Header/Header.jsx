import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Flex, Typography } from "antd";
import { pages, pathname } from "../../enums";
import { BellOutlined, PoweroffOutlined } from "@ant-design/icons";
import foto from "../../assets/28.jpg";
import { useSelector } from "react-redux";
import { employeeInfo } from "../../utils";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Главная");
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const employees = useSelector((state) => state.employees.employees);

  const matching = notifications?.filter((notif) =>
    employees?.some((emp) => emp.id === notif.member_id)
  );

  const message = matching?.filter(
    (item) => item.member_id === employeeInfo()?.id
  );

  useEffect(() => {
    const key = Object.keys(pathname).find(
      (key) => pathname[key] === location.pathname
    );
    if (key) {
      setTitle(pages[key]);
    }
  }, [location]);

  const logOut = () => {
    localStorage.removeItem("statusCount");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <Flex
        align="center"
        justify="space-between"
        className={`${styles.nav} container`}
        style={{ height: "100%" }}
      >
        <Typography.Title level={4}>{title}</Typography.Title>
        <Flex align="center" className={styles.nav_list}>
          <div className={styles.bellWrapper}>
            <BellOutlined />
            <p className={styles.messageCount}>{message?.length}</p>
          </div>
          <Flex align="center" gap={"small"}>
            <img src={foto} alt="user foto" className={styles.user_foto} />
            <p>Testov Test</p>
          </Flex>
          <div className={`${styles.logout}`} onClick={() => logOut()}>
            <PoweroffOutlined className={styles.out} />
          </div>
        </Flex>
      </Flex>
    </header>
  );
};
