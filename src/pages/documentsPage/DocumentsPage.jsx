import { Col, Flex, Input, Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Wrapper } from "../../common";
import { useDocumentsColums } from "./useDocumentsColums";
import styles from "./DocumentsPage.module.scss";
import { pages, pathname } from "../../enums";
import { dataSource } from "../../data";

const items = [
  { value: "1", label: "Утверждено" },
  { value: "2", label: "Отказано" },
  { value: "3", label: "На обработке" },
  { value: "4", label: "Черновик" },
  { value: "5", label: "Доработать" },
];

export const DocumemtsPage = () => {
const { columns } = useDocumentsColums();

  return (
    <Wrapper
      className={styles.content}
      path={pathname.DOCUMENTS}
      title={pages.DOCUMENTS}
      page={true}
    >
      <Flex gap="small">
        <Input
          placeholder="Поиск по инициатору"
          prefix={<SearchOutlined />}
          style={{
            width: "30%",
          }}
        />
        <Select
          placeholder="Год"
          options={items}
          style={{
            width: "10%",
          }}
        />
        <Select
          placeholder="Месяц"
          options={items}
          style={{
            width: "10%",
          }}
        />
        <Select
          placeholder="Папка"
          options={items}
          style={{
            width: "10%",
          }}
        />
        <Select
          placeholder="Статус документа"
          options={items}
          style={{
            width: "15%",
          }}
        />
      </Flex>

      <Col span={24}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          className={styles.table}
          bordered
          scroll={{ y: 480 }}
        />
      </Col>
    </Wrapper>
  );
};
