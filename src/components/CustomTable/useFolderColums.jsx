import { ArrowDownOutlined, CaretDownOutlined, DeleteOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import styles from "./CustomTable.module.scss";
import { FilterButton, FolderButton, StatusButton } from "../../common";
import { status } from "../../enums";

export const useFolderColumns = () => {
  const columns = [
    {
      title: "№",
      dataIndex: "guid",
      key: "guid",
      align: "center",
      width: 100,
      render: (guid) => (
        <div className={styles.guid}>
          <p>{guid}</p>
          <FilterButton>
            <FileTextOutlined />
            <CaretDownOutlined />
          </FilterButton>
        </div>
      ),
    },
    {
      title: "Инициатор",
      dataIndex: "user_name",
      key: "user_name",
      render: (user_name, title) => (
        <img src="" alt="product" className={styles.cart__img} />
      ),
      align: "center",
    },
    {
      title: "Тема",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Папка",
      dataIndex: "folder_name",
      key: "folder_name",
      align: "center",
    },
    {
      title: "Статус",
      dataIndex: "delete",
      key: "delete",
      width: 50,
      render: (record) => (
        <StatusButton icon={false} statusFolder={status.REJECTED}>
          Отказано
        </StatusButton>
      ),
      align: "center",
    },
  ];

  return {
    columns,
  };
};
