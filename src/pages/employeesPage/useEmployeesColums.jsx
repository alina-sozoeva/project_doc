import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./EmployeesPage.module.scss";

export const useEmployeesColums = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "guid",
      key: "guid",
      align: "center",
    },
    {
      title: "ФИО",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
    },
    {
      title: "Логин",
      dataIndex: "folder_name",
      key: "folder_name",
      align: "center",
    },
    {
      title: "Телеграмм",
      dataIndex: "telegram",
      key: "telegram",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Должность",
      dataIndex: "position",
      key: "position",
      align: "center",
    },
  ];

  return {
    columns,
  };
};
