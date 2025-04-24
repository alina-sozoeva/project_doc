import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./CounterpartyTable.module.scss";
import { employeeInfo, useUser } from "../../utils";

export const useCounterpartyColums = (handleOpenWarn) => {
  const user = useUser();

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
      dataIndex: "employee_id",
      key: "employee_id",
      width: 100,
      render: (text) => {
        if (text === user.guid) {
          return (
            <>
              <p>{user.fio}</p>
              <p>{user.email}</p>
            </>
          );
        }
      },
    },
    {
      title: "Наименование компании",
      dataIndex: "company_name",
      key: "company_name",
      width: 100,
    },
    {
      title: "Юридический адрес",
      dataIndex: "legal_address",
      key: "legal_address",
      width: 150,
      //   render: (_, record) => record.data.contract_number,
    },
    {
      title: "Фактический адрес",
      dataIndex: "actual_address",
      key: "actual_address",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },

    {
      title: "Контактное лицо",
      dataIndex: "fio",
      key: "fio",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Статус проверки",
      dataIndex: "verification_status",
      key: "verification_status",
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
