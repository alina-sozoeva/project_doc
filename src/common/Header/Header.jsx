import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { useEffect, useState } from "react";
import { Flex, Typography } from "antd";
import { pages, pathname } from "../../enums";
import { BellOutlined, PoweroffOutlined } from "@ant-design/icons";
import foto from "../../assets/28.jpg";
import { useSelector } from "react-redux";
import { useGetDocCountsQuery } from "../../store";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("Главная");
  const user = useSelector((state) => state.users.user);
  const { data: processes } = useGetDocCountsQuery({ employee_id: user?.guid });

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
          {/* <div className={styles.bellWrapper}>
            <BellOutlined />
            <p className={styles.messageCount}>{processes?.totalCount}</p>
          </div> */}
          <Flex align="center" gap={"small"}>
            <img src={foto} alt="user foto" className={styles.user_foto} />
            <Flex vertical gap={"small"}>
              <p>{user.fio}</p>
              <p>{user.email}</p>
            </Flex>
          </Flex>
          <div className={`${styles.logout}`} onClick={() => logOut()}>
            <PoweroffOutlined className={styles.out} />
          </div>
        </Flex>
      </Flex>
    </header>
  );
};
