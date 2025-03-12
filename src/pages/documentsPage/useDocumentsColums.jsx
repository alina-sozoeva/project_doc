import { EditOutlined } from "@ant-design/icons";
import styles from "./DocumentsPage.module.scss";
import { StatusButton } from "../../common";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const useDocumentsColums = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "№",
      dataIndex: "guid",
      key: "guid",
      align: "center",
      width: 30,
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
      width: 100,
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
      width: 100,
    },
    {
      title: "Папка",
      dataIndex: "folder_name",
      key: "folder_name",
      align: "center",
      width: 100,
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
      width: 80,
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
          onClick={() => navigate("/edit-folder")}
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
