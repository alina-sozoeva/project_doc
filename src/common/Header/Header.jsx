import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Button, Flex, Typography } from "antd";
import { pages, pathname } from "../../enums";
import { BellOutlined, LogoutOutlined } from "@ant-design/icons";
import foto from "../../assets/28.jpg";
import { useSelector } from "react-redux";
import { employeeInfo } from "../../utils";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Главная");
  const notifications = useSelector((state) => state.notifications.notifArr);
  const employees = useSelector((state) => state.employees.employees);

  console.log(employees, "employees");

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

  console.log(matching, "matching");

  console.log(message, "message");

  const logOut = () => {
    localStorage.removeItem("statusCount");
    localStorage.removeItem("userInfo");
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
        <Typography.Title level={3}>{title}</Typography.Title>
        <Flex align="center" className={styles.nav_list}>
          <div className={styles.bellWrapper}>
            <BellOutlined />
            {/* <p className={styles.messageCount}>{message.length}</p> */}
          </div>
          <Flex align="center" gap={"small"}>
            <img src={foto} alt="user foto" className={styles.user_foto} />
          </Flex>
          <Button
            type="primary"
            className={`${styles.logout}`}
            onClick={() => logOut()}
          >
            <LogoutOutlined className={styles.out} /> Выход
          </Button>
        </Flex>
      </Flex>
    </header>
  );
};
