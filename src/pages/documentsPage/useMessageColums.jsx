import { EditOutlined } from "@ant-design/icons";
import styles from "./DocumentsPage.module.scss";
import { StatusButton } from "../../common";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export const useMessageColums = () => {
  const navigate = useNavigate();

  const onStatus = (record) => {
    console.log(record);
    navigate(`/edit-folder/${record.doc_id}/${record.folder_status}`);
  };

  const columnsMessage = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 30,
      render: (_text, _record, index) => index + 1,
    },
    // {
    //   title: "Инициатор",
    //   dataIndex: "data",
    //   align: "center",
    //   key: "data",
    //   render: (_, record) => {
    //     console.log(record);

    //     return (
    //       <div className={styles.table_user_info}>
    //         <img
    //           src={record.data.user_foto}
    //           alt="product"
    //           className={styles.cart_img}
    //         />
    //         <div>
    //           <h2>{record.data.user_name}</h2>
    //           <p>{record.data.doc_name}</p>
    //         </div>
    //       </div>
    //     );
    //   },
    //   width: 100,
    // },
    {
      title: "Статус",
      dataIndex: "folder_status",
      key: "folder_status",
      align: "center",
      width: 100,
      render: (record) => record,
    },
    {
      title: "Мартшрут",
      dataIndex: "member_id",
      key: "member_id",
      align: "center",
      width: 100,
      render: (_, record) => record.member_id,
    },
    {
      title: "...",
      key: "doc_id",
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
    columnsMessage,
  };
};
