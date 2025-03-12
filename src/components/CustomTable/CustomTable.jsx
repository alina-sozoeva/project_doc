import { Col, Input, Select, Table } from "antd";
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
    status: "Утверждено",
  },
  {
    key: "2",
    guid: 21,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon Kennady",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
    status: "Отказано",
  },
  {
    key: "3",
    guid: 22,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
    status: "На обработке",
  },
  {
    key: "4",
    guid: 22,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
    status: "Черновик",
  },
  {
    key: "5",
    guid: 24,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
    status: "Доработать",
  },
  {
    key: "6",
    guid: 25,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
    status: "Черновик",
  },
  {
    key: "7",
    guid: 26,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
    status: "Черновик",
  },
  {
    key: "8",
    guid: 27,
    user_foto: "http://docs.icloud.kg/image/avatar/28.jpg",
    user_name: "Leon",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "qwerty",
    status: "Черновик",
  },
];

const items = [
  { value: "1", label: "Утверждено" },
  { value: "2", label: "Отказано" },
  { value: "3", label: "На обработке" },
  { value: "4", label: "Черновик" },
  { value: "5", label: "Доработать" },
];

export const CustomTable = () => {
  const { columns } = useFolderColumns();
  return (
    <div>
      <Wrapper>
        <div className={styles.content}>
          <div className={styles.filter}>
            <Input
              placeholder="Поиск"
              prefix={<SearchOutlined />}
              style={{
                width: "30%",
              }}
            />
            <Select
              placeholder="Статус документа"
              options={items}
              style={{
                width: "15%",
              }}
            />
          </div>

          <Col span={24}>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              className={styles.table}
              bordered
              scroll={{ y: 450 }}
            />
          </Col>
        </div>
      </Wrapper>
    </div>
  );
};
