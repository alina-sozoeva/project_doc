import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Space } from "antd";
import { useEffect, useMemo } from "react";
import styles from "./CustomSidebar.module.scss";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { SettingOutlined } from "@ant-design/icons";
import { dataDocument } from "../../data";

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const processes = useSelector((state) => state.processes.processes);

  const baseMenu = [
    {
      key: "1",
      label: "Главная",
      path: "/",
    },
    {
      key: "3",
      label: "Структура организации",
      path: "/employees",
    },
  ];

  const adminOnlyMenu =
    JSON.parse(localStorage.getItem("userInfo")) === "admin@gmail.com"
      ? [
          {
            key: "4",
            label: (
              <>
                <SettingOutlined /> Процессы
              </>
            ),
            path: "/processes",
          },
        ]
      : [];

  const dynamicMenu = processes?.map((item, index) => ({
    key: `dynamic-${index}`,
    label: item.title,
    path: `/documents?process_name=${item.process_name}`, // можно item.title, но id — надёжнее
  }));

  const menuKeys = [...baseMenu, ...dynamicMenu, ...adminOnlyMenu];

  const selectedKey = useMemo(() => {
    const currentMenuItem = menuKeys.find(
      (item) => item.path === location.pathname
    );
    return currentMenuItem ? currentMenuItem.key : null;
  }, [location.pathname]);

  const handleMenuClick = () => {
    localStorage.removeItem("filteredStatus");
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.nav}>
        <Space direction={"horizontal"} className={styles.logo} size={56}>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
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
    </div>
  );
};
