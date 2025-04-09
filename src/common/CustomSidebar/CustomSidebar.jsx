import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Space } from "antd";
import { useEffect, useMemo } from "react";
import { processesMap } from "../../enums";
import styles from "./CustomSidebar.module.scss";
import logo from "../../assets/logo.png";

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const stepDataList = JSON.parse(localStorage.getItem("stepDataList")) || [];

  const baseMenu = [
    {
      key: "1",
      label: "Главная",
      path: "/",
    },
    {
      key: "2",
      label: "Все документы",
      path: "/documents",
    },
  ];

  const adminOnlyMenu =
    JSON.parse(localStorage.getItem("userInfo")) === "admin@gmail.com"
      ? [
          {
            key: "3",
            label: "Структура организации",
            path: "/employees",
          },
          {
            key: "4",
            label: "Справочник процессов",
            path: "/processes",
          },
        ]
      : [];

  const dynamicMenu = stepDataList?.map((item, index) => ({
    key: `dynamic-${index}`,
    label: processesMap[item.title] || item.title,
    path: `${item.title}`,
  }));

  const menuKeys = [...baseMenu, ...adminOnlyMenu, ...dynamicMenu];

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
              <a href={path} onClick={() => handleMenuClick()}>
                {label}
              </a>
            ),
          }))}
          className={styles.menu}
        />
      </div>
    </div>
  );
};
