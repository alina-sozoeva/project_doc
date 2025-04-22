import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./AgreementTable.module.scss";
import { employeeInfo } from "../../utils";

export const useAgreementColumns = (handleOpenWarn) => {
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
      title: "Номер договора",
      dataIndex: "contract_number",
      key: "contract_number",
      width: 100,
    },
    {
      title: "Дата создания",
      dataIndex: "creation_date",
      key: "creation_date",
      width: 150,
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Контрагент",
      dataIndex: "contragent",
      key: "contragent",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },

    {
      title: "Тип договора",
      dataIndex: "contract_type",
      key: "contract_type",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Срок действия",
      dataIndex: "validity_period",
      key: "validity_period",
      width: 100,
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Статус согласования",
      dataIndex: "approval_status",
      key: "approval_status",
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
