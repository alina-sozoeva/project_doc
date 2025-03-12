import { Link } from "react-router-dom";
import { Button, Menu, Space } from "antd";
import styles from "./CustomSidebar.module.scss";
import { LogoutOutlined } from "@ant-design/icons";

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
  // {
  //   key: "4",
  //   label: "Добавить сотрудника",
  //   path: "/add-employee",
  // },
  {
    key: "5",
    label: "Все папки",
    path: "/folders",
  },
];

export const CustomSidebar = () => {
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.nav}>
        <Space direction={"horizontal"} className={styles.logo} size={56}>
          <Link to="/">
            <img
              src="http://docs.icloud.kg/image/logo.png"
              alt="logo"
            />
          </Link>
        </Space>

        <Menu
          theme="light"
          mode="inline"
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

