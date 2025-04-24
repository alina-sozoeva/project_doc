import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "./ProcessesPage.module.scss";
import { Button } from "antd";
import { RouteButton } from "../../common";
import { processesMap } from "../../enums";
import { useGetProcessesMembersQuery } from "../../store";
import foto from "../../assets/foto.jpg";
import { useState } from "react";

export const useProcessesColumns = () => {
  const { data } = useGetProcessesMembersQuery();

  const columns = [
    {
      title: "№",
      dataIndex: "guid",
      key: "guid",
      align: "center",
      width: 20,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Название процесса",
      dataIndex: "name",
      key: "name",
      width: 80,
    },
    {
      title: "Название основного процесса",
      dataIndex: "basic_processes",
      key: "basic_processes",
      width: 120,
      render: (text) => processesMap[text],
    },
    {
      title: "Маршрут",
      dataIndex: "record",
      key: "record",
      align: "center",
      width: 200,
      render: (_, record) => {
        const filteredData = data?.data?.filter(
          (item) => item.process_id === record.guid
        );

        return filteredData?.length === 0 ? (
          <div className="chain_container">
            <RouteButton></RouteButton>
            <div className="arrow" />
            <RouteButton></RouteButton>
          </div>
        ) : (
          <div className="chain_container">
            {filteredData?.map((step, index) => {
              return (
                <>
                  <RouteButton item={step}>
                    {/* <img src={foto} style={{ width: "100%" }} alt="" /> */}
                  </RouteButton>
                  {index < filteredData?.length - 1 && (
                    <div className="arrow" />
                  )}
                </>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "...",
      key: "record",
      align: "center",
      width: 50,
      render: (record) => (
        <Button
          danger
          className={styles.btn}
          //   onClick={() => onStatus(record.guid)}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  return {
    columns,
  };
};
