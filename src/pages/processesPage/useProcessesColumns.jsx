import { DeleteOutlined } from "@ant-design/icons";
import styles from "./ProcessesPage.module.scss";
import { Button } from "antd";
import { RouteButton } from "../../common";

export const useProcessesColumns = (handleOpenStep) => {
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
      title: "Название процесса",
      dataIndex: "title",
      key: "title",
      width: 80,
    },
    {
      title: "Название основного процесса",
      dataIndex: "processName",
      key: "processName",
      width: 120,
    },
    {
      title: "Маршрут",
      dataIndex: "record",
      key: "record",
      align: "center",
      width: 200,
      render: (record) => (
        <div
          className={styles.chain_container}
          onClick={() => handleOpenStep()}
        >
          <RouteButton>1</RouteButton>
          <div className={styles.line} />
          <RouteButton>2</RouteButton>
          {/* <div className={styles.line} />
          <RouteButton>3</RouteButton>
          <div className={styles.line} />
          <RouteButton>4</RouteButton>
          <div className={styles.line} />
          <RouteButton>5</RouteButton> */}
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
