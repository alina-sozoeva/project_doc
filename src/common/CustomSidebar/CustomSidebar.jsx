import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flex, Menu, Space } from "antd";
import { useEffect, useMemo } from "react";
import styles from "./CustomSidebar.module.scss";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import {
  ClusterOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { dataDocument } from "../../data";

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const processes = useSelector((state) => state.processes.processes);

  const baseMenu = [
    {
      key: "1",
      label: (
        <>
          <HomeOutlined /> Главная
        </>
      ),
      path: "/",
    },
    {
      key: "3",
      label: (
        <>
          <ClusterOutlined /> Структура организации
        </>
      ),
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
    label: (
      <Flex align="center" gap={"small"}>
        <span style={{ fontSize: "20px" }}>•</span>
        {item.title}
      </Flex>
    ),
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
              <Link
                style={{ fontWeight: 600 }}
                to={path}
                onClick={() => handleMenuClick()}
              >
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
