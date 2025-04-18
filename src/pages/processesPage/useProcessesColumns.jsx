import { DeleteOutlined } from "@ant-design/icons";
import styles from "./ProcessesPage.module.scss";
import { Button } from "antd";
import { RouteButton } from "../../common";
import { processesMap } from "../../enums";

export const useProcessesColumns = () => {
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
      dataIndex: "process_name",
      key: "process_name",
      width: 120,
      render: (text) => processesMap[text],
    },
    {
      title: "Маршрут",
      dataIndex: "record",
      key: "record",
      align: "center",
      width: 200,
      render: (record) => (
        <div className="chain_container">
          <RouteButton>1</RouteButton>
          <div className="line" />
          <RouteButton>2</RouteButton>
          {/* <div className="line" />
          <RouteButton>3</RouteButton>
          <div className="line" />
          <RouteButton>4</RouteButton>
          <div className="line" />
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
