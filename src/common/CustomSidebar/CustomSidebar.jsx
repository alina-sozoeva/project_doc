import { Link, useLocation } from "react-router-dom";
import { Button, Menu, Space } from "antd";
import styles from "./CustomSidebar.module.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { useMemo } from "react";

const menuKeys = [
  {
    key: "1",
    label: "Гавная",
    path: "/",
  },
  {
    key: "2",
    label: "Все документы",
    path: "/documents",
  },
  {
    key: "3",
    label: "Список сотрудников",
    path: "/employees",
  },
];

export const CustomSidebar = () => {
  const location = useLocation();

  const selectedKey = useMemo(() => {
    if (location.pathname.includes("edit-folder")) {
      return "2";
    }
    if (location.pathname.includes("add-employee")) {
      return "3";
    }
    const currentMenuItem = menuKeys.find(
      (item) => item.path === location.pathname
    );
    return currentMenuItem ? currentMenuItem.key : null;
  }, [location.pathname]);

  const handleMenuClick = () => {
    localStorage.removeItem("filteredStatus");
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.nav}>
        <Space direction={"horizontal"} className={styles.logo} size={56}>
          <Link to="/">
            <img src="http://docs.icloud.kg/image/logo.png" alt="logo" />
          </Link>
        </Space>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={menuKeys.map(({ key, label, path }) => ({
            key,
            label: (
              <Link to={path} onClick={() => handleMenuClick()}>
                {label}
              </Link>
            ),
          }))}
          className={styles.menu}
        />
      </div>
      <Button type="primary" className={`${styles.logout}`}>
        <LogoutOutlined className={styles.out} /> Выход
      </Button>
    </div>
  );
};
