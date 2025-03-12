import React, { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Menu, Space } from "antd";
import styles from "./CustomSidebar.module.scss";
import { LogoutOutlined } from "@ant-design/icons";

const menuKeys = [
  {
    key: "1",
    label: "Все документы",
    path: "/",
  },
  {
    key: "2",
    label: "Список сотрудников",
    path: "/employees",
  },
  {
    key: "3",
    label: "Добавить сотрудника",
    path: "/add-employee",
  },
  {
    key: "4",
    label: "Все папки",
    path: "/registry",
  },
];

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = useMemo(
    () =>
      menuKeys.find((item) => location.pathname.includes(item.path))?.key || "",
    [location]
  );

  const onClick = (e) => {
    console.log("click ", e);
  };

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.nav}>
        <Space direction={"horizontal"} className={styles.logo} size={56}>
          <Link to="/">
            <img
              style={{ width: "100px" }}
              src="http://docs.icloud.kg/image/logo.png"
              alt="logo"
            />
          </Link>
        </Space>

        <Menu
          theme="light"
          mode="inline"
          onClick={onClick}
          items={menuKeys.map(({ key, label, path }) => ({
            key,
            label: <Link to={path}>{label}</Link>,
          }))}
          className={styles.menu}
        />
      </div>
      <Button className={`${styles.logout}`}>
        <LogoutOutlined className={styles.out} /> Выход
      </Button>
    </div>
  );
};

export const Sidebar = React.memo(CustomSidebar);
