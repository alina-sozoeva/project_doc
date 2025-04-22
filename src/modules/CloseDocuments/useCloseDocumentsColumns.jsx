import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./CloseDocumentsTable.module.scss";
import { employeeInfo } from "../../utils";

export const useCloseDocumentsColumns = (handleOpenWarn) => {
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 30,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Инициатор",
      dataIndex: "user",
      key: "user",
      width: 100,
      render: (text) => (
        <div>
          <p>{employeeInfo().fio}</p>
          <p>{employeeInfo().email}</p>
        </div>
      ),
    },
    {
      title: "Наименование процесса",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Основание (договор/документ)",
      dataIndex: "basis_document",
      key: "basis_document",
      width: 150,
      //   render: (_, record) => record.data.contract_number,
    },
    {
      title: "Дата закрытия",
      dataIndex: "close_date",
      key: "close_date",
      width: 100,
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },

    {
      title: "Статус закрытия",
      dataIndex: "close_status",
      key: "close_status",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Комментарии",
      dataIndex: "comments",
      key: "comments",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Маршрут",
      dataIndex: "data",
      key: "data",
      align: "center",
      width: 200,
      render: (record) => (
        <div className="chain_container">
          <RouteButton>1</RouteButton>
          <div className="line" />
          <RouteButton>2</RouteButton>
          <div className="line" />
          <RouteButton>3</RouteButton>
          <div className="line" />
          <RouteButton>4</RouteButton>
          <div className="line" />
          <RouteButton>5</RouteButton>
        </div>
      ),
    },
    {
      title: "...",
      key: "record",
      align: "center",
      width: 50,
      render: (record) => (
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => handleOpenWarn()}
        >
          В работу
        </Button>
      ),
    },
  ];

  return {
    columns,
  };
};
