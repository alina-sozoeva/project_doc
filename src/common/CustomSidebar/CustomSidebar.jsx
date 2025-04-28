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
import {
  useGetDocsCloseQuery,
  useGetDocsContragentQuery,
  useGetDocsSoglosovanieQuery,
  useGetDocsVyplataQuery,
  useGetDocsZakupQuery,
  useGetProcessesQuery,
} from "../../store";
import { processesKeys } from "../../enums";

export const CustomSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = useGetProcessesQuery();
  const user = useSelector((state) => state.users.user);
  const { data: contragent } = useGetDocsContragentQuery();
  const { data: sogl } = useGetDocsSoglosovanieQuery();
  const { data: vyplata } = useGetDocsVyplataQuery();
  const { data: zakup } = useGetDocsZakupQuery();
  const { data: close } = useGetDocsCloseQuery();

  const getFilteredCount = (processName) => {
    let filteredData = [];

    if (processName === processesKeys.CONTRAGENT) {
      filteredData = contragent?.data || [];
    } else if (processName === processesKeys.SOGLOSOVANIE) {
      filteredData = sogl?.data || [];
    } else if (processName === processesKeys.VYPLATA) {
      filteredData = vyplata?.data || [];
    } else if (processName === processesKeys.ZAKUP) {
      filteredData = zakup?.data || [];
    } else if (processName === processesKeys.CLOSE) {
      filteredData = close?.data || [];
    }

    return (
      filteredData.filter((item) => item.member_id === user.guid).length || null
    );
  };

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
  ];

  const adminOnlyMenu =
    user?.email === "admin@gmail.com"
      ? [
          {
            key: "3",
            label: (
              <>
                <ClusterOutlined /> Структура организации
              </>
            ),
            path: "/employees",
          },
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

  const dynamicMenu =
    data?.data?.map((item, index) => ({
      key: `dynamic-${index}`,
      label: (
        <Flex align="center" gap={"small"}>
          <span style={{ fontSize: "20px" }}>•</span>
          {item.name} {getFilteredCount(item.basic_processes)}
        </Flex>
      ),
      path: `/documents?process_name=${item.basic_processes}&process_id=${item.guid}`,
    })) || [];

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
