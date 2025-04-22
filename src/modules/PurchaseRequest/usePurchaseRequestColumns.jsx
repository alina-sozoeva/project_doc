import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./PurchaseRequestTable.module.scss";
import { employeeInfo } from "../../utils";

export const usePurchaseRequestColumns = (handleOpenWarn) => {
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
      title: "Название документа",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Бюджетная статья",
      dataIndex: "budget",
      key: "budget",
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
      title: "Крайний срок проведения",
      dataIndex: "end_date",
      key: "end_date",
      width: 100,
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
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
      // render: (_, record) => (
      //   <div className="chain_container">
      //     {record.record.map((step, index) => (
      //       <React.Fragment key={index}>
      //         <RouteButton statusFolder={step.status} item={record}>
      //           {step.step}
      //         </RouteButton>
      //         {index < record.record.length - 1 && <div className="line" />}
      //       </React.Fragment>
      //     ))}
      //   </div>
      // ),
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
