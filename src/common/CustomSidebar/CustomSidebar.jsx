import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flex, Menu, Space } from "antd";
import { useEffect, useMemo } from "react";
import styles from "./CustomSidebar.module.scss";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import {
  BellOutlined,
  ClusterOutlined,
  HistoryOutlined,
  HomeOutlined,
  InboxOutlined,
  PlusOutlined,
  SettingOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useGetDocCountsQuery } from "../../store";

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const { data: processes } = useGetDocCountsQuery({
    employee_id: user?.guid,
  });

  const dynamicMenu =
    processes?.counts?.map((item, index) => ({
      key: `dynamic-${index}`,
      label: (
        <Flex justify="space-between" align="center" gap={"small"}>
          <Flex align="center" gap={"small"}>
            <span style={{ fontSize: "20px" }}>•</span>
            <span>{item.name}</span>
          </Flex>
          {item.count !== 0 && <span>{item.count}</span>}
        </Flex>
      ),
      path: `/documents?process_name=${item.basic_processes}&process_id=${item.guid}`,
    })) || [];

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
      key: "4",
      label: (
        <>
          <SettingOutlined /> Процессы
        </>
      ),
      children: dynamicMenu,
    },
    {
      key: "5",
      label: (
        <Flex justify="space-between">
          <span>
            <InboxOutlined /> Входящие
          </span>
          {processes?.totalCount !== 0 && <span>{processes?.totalCount}</span>}
        </Flex>
      ),
      path: "/documents?process_name=all-docs-process",
    },
    {
      key: "6",
      label: (
        <>
          <BellOutlined /> Непрочитанные
        </>
      ),
      path: "/documents?process_name=unread-docs-process",
    },
    {
      key: "7",
      label: (
        <>
          <HistoryOutlined /> История
        </>
      ),
      path: "/history",
    },
    {
      key: "8",
      label: (
        <>
          <StarOutlined /> Избранное
        </>
      ),
      path: "/favorites",
    },
    // {
    //   key: "9",
    //   label: (
    //     <>
    //       <SearchOutlined /> Поиск
    //     </>
    //   ),
    //   path: "/search",
    // },
  ];

  const adminOnlyMenu =
    user?.email === "admin@gmail.com"
      ? [
          {
            key: "2",
            label: (
              <>
                <ClusterOutlined /> Структура организации
              </>
            ),
            path: "/employees",
          },
          {
            key: "3",
            label: (
              <>
                <PlusOutlined /> Добавить процесс
              </>
            ),
            path: "/add-processes",
          },
        ]
      : [];

  const menuKeys = [...baseMenu, ...adminOnlyMenu];

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
    const storedUser = localStorage.getItem("user");

    if (!user || !storedUser) {
      navigate("/login");
    }
  }, [user, navigate]);

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
          selectedKeys={[selectedKey]}
          className={styles.menu}
          items={menuKeys.map((menuItem) => {
            if (menuItem.children) {
              return {
                key: menuItem.key,
                label: <p style={{ fontWeight: 600 }}>{menuItem.label}</p>,
                children: menuItem.children.map((child) => ({
                  key: child.key,
                  label: (
                    <Link
                      to={child.path}
                      onClick={handleMenuClick}
                      style={{ fontWeight: 600 }}
                    >
                      {child.label}
                    </Link>
                  ),
                })),
              };
            }

            return {
              key: menuItem.key,
              label: (
                <Link
                  to={menuItem.path}
                  onClick={handleMenuClick}
                  style={{ fontWeight: 600 }}
                >
                  {menuItem.label}
                </Link>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};
