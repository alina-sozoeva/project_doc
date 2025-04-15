import { EditOutlined } from "@ant-design/icons";
import styles from "./DocumentsPage.module.scss";
import { StatusButton } from "../../common";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const useDocumentsColums = () => {
  const navigate = useNavigate();

  const onStatus = (record) => {
    console.log(record);
    navigate(`/edit-folder/${record.guid}/${record.status}`);
  };

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
      dataIndex: "data",
      align: "center",
      key: "data",
      render: (_, record) => {
        console.log(record);

        return (
          <div className={styles.table_user_info}>
            <img
              src={record.data.user_foto}
              alt="product"
              className={styles.cart_img}
            />
            <div>
              <h2>{record.data.user_name}</h2>
              <p>{record.data.doc_name}</p>
            </div>
          </div>
        );
      },

      width: 100,
    },
    {
      title: "Название процесса",
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
      render: (_, record) => dayjs(record.date).format("DD.MM.YYYY"),
    },
    {
      title: "Мартшрут",
      dataIndex: "folder_name",
      key: "folder_name",
      align: "center",
      width: 100,
      render: (_, record) => record.folder_name,
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
      key: "guid",
      align: "center",
      width: 50,
      render: (record) => (
        <Button
          className={styles.btn}
          icon={false}
          source={"table"}
          type="primary"
          onClick={() => onStatus(record)}
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
