import { CaretDownOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./CustomTable.module.scss";
import { FilterButton, StatusButton } from "../../common";
import { Button } from "antd";
import { status } from "../../enums";

export const useFolderColumns = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "guid",
      key: "guid",
      align: "center",
      width: 50,
    },
    {
      title: "Инициатор",
      dataIndex: "user_name",
      key: "user_name",
      render: (user_name, record) => (
        <div className={styles.table_user_info}>
          <img
            src="http://docs.icloud.kg/image/avatar/28.jpg"
            alt="product"
            className={styles.cart_img}
          />
          <div>
            <h2>{user_name}</h2>
            <p>{record.title}</p>
          </div>
        </div>
      ),
      width: 150,
    },
    {
      title: "Тема",
      dataIndex: "title",
      key: "title",
      align: "center",
      width: 150,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 150,
    },
    {
      title: "Папка",
      dataIndex: "folder_name",
      key: "folder_name",
      align: "center",
      width: 150,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (record) => (
        <StatusButton icon={false} statusFolder={record} source={"table"}>
          {record}
        </StatusButton>
      ),
      width: 100,
    },
    {
      title: "...",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: 50,
      render: (guid) => (
        <Button
          className={styles.btn}
          icon={false}
          source={"table"}
          type="primary"
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return {
    columns,
  };
};
