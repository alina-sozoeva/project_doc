import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./AgreementTable.module.scss";
import { useProcessesMembers } from "../../utils";

export const useAgreementColumns = (handleOpenWarn, user, processId) => {
  const filteredData = useProcessesMembers(processId);

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "guid",
      align: "center",
      width: 30,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Инициатор",
      dataIndex: "employee_id",
      key: "employee_id",
      width: 100,
      render: () => (
        <>
          <p>{user.fio}</p>
          <p>{user.email}</p>
        </>
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
      key: "guid",
      align: "center",
      width: 200,
      render: () => (
        <div className="chain_container">
          {filteredData?.map((step, index) => {
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
