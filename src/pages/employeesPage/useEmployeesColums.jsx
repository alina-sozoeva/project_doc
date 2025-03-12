import { CaretDownOutlined } from "@ant-design/icons";
import styles from "./EmployeesPage.module.scss";

export const useEmployeesColums = () => {
  const columns = [
    {
      title: "ФИО",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
    },
    {
      title: "Склонение ФИО",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Склонение ФИО KG",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Логин",
      dataIndex: "folder_name",
      key: "folder_name",
      align: "center",
    },
    {
      title: "Пароль",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Телеграмм",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
    {
      title: "Должность",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
    {
      title: "Склонение должности",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
    {
      title: "Должность KG",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
    {
      title: "Склонение должности KG",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
    {
      title: "Кампус",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
    {
      title: "Подпись",
      dataIndex: "edit",
      key: "edit",
      align: "center",
    },
  ];

  return {
    columns,
  };
};
