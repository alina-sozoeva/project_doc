import { Input, Table } from "antd";
import { Wrapper } from "../../common";
import styles from "./CustomTable.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useFolderColumns } from "./useFolderColums";

const dataSource = [
  {
    key: "1",
    guid: 13,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Mike",
    title: "qwerty",
    date: "2000-01-01",
    folder_name: "qwerty",
  },
  {
    key: "2",
    guid: 21,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
  },
];
export const CustomTable = () => {
  const { columns } = useFolderColumns();
  return (
    <Wrapper>
      <div className={styles.content}>
        <Input
          placeholder="Поиск"
          prefix={<SearchOutlined />}
          style={{
            width: "40%",
          }}
        />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          // scroll={{ x: 500, y: 200 }}
        />
      </div>
    </Wrapper>
  );
};
