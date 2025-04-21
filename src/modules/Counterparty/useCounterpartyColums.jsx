import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./CounterpartyTable.module.scss";

export const useCounterpartyColums = (handleOpenWarn) => {
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
