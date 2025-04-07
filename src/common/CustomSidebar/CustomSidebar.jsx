import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Space } from "antd";
import styles from "./CustomSidebar.module.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useMemo } from "react";
import logo from "../../assets/logo.png";
import { processesMap } from "../../enums";

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const stepDataList = JSON.parse(localStorage.getItem("stepDataList")) || [];

  const menuKeys = [
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
    ...stepDataList?.map((item, index) => ({
      key: `dynamic-${index}`,
      label: processesMap[item.title],
      path: `${item.title}`,
    })),
  ];

  const selectedKey = useMemo(() => {
    if (location.pathname.includes("add-document")) {
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

  const logOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
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
      {/* <Button
        type="primary"
        className={`${styles.logout}`}
        onClick={() => logOut()}
      >
        <LogoutOutlined className={styles.out} /> Выход
      </Button> */}
    </div>
  );
};
