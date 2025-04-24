import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./CloseDocumentsTable.module.scss";
import { useGetProcessesMembersQuery } from "../../store";
import { useProcessesMembers } from "../../utils";

export const useCloseDocumentsColumns = (handleOpenWarn, user, processId) => {
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
      dataIndex: "user",
      key: "user",
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
