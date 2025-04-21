import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./PaymentRequestTable.module.scss";

export const usePaymentRequestColumns = (handleOpenWarn) => {
  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 20,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Инициатор",
      dataIndex: "user",
      key: "user",
      width: 100,
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
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Статья бюджета",
      dataIndex: "budget_item",
      key: "budget_item",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Комментарии",
      dataIndex: "comment",
      key: "comment",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Маршрут",
      dataIndex: "data",
      key: "data",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="chain_container">
          {record.record.map((step, index) => (
            <React.Fragment key={index}>
              <RouteButton statusFolder={step.status} item={record}>
                {step.step}
              </RouteButton>
              {index < record.record.length - 1 && <div className="line" />}
            </React.Fragment>
          ))}
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
