import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./PaymentRequestTable.module.scss";
import { useUser } from "../../utils";

export const usePaymentRequestColumns = (handleOpenWarn) => {
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
      title: "Наименование заявки",
      dataIndex: "request_name",
      key: "request_name",
      width: 100,
    },
    {
      title: "Основание заявки",
      dataIndex: "request_basis",
      key: "request_basis",
      width: 150,
      //   render: (_, record) => record.data.contract_number,
    },
    {
      title: "Контрагент",
      dataIndex: "contragent",
      key: "contragent",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },

    {
      title: "Срок оплаты",
      dataIndex: "payment_date",
      key: "payment_date",
      width: 100,
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Статья бюджета",
      dataIndex: "budget",
      key: "budget",
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
