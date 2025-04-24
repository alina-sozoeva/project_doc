import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./PaymentRequestTable.module.scss";
import { useProcessesMembers } from "../../utils";

export const usePaymentRequestColumns = (handleOpenWarn, user, processId) => {
  const filteredData = useProcessesMembers(processId);

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
      render: (text) => (
        <>
          <p>{user.fio}</p>
          <p>{user.email}</p>
        </>
      ),
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
      render: () => (
        <div className="chain_container">
          {filteredData?.map((step, index) => {
            console.log(step);

            return (
              <>
                <RouteButton item={step}>
                  {/* <img src={foto} style={{ width: "100%" }} alt="" /> */}
                </RouteButton>
                {index < filteredData?.length - 1 && <div className="arrow" />}
              </>
            );
          })}
        </div>
      ),
    },
    {
      title: "...",
      key: "guid",
      dataIndex: "guid",
      align: "center",
      width: 50,
      render: (text) => (
        <Button
          type="primary"
          className={styles.btn}
          onClick={() => handleOpenWarn(text)}
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
