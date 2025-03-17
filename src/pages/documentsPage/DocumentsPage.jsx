import { Col, Flex, Input, Select, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Wrapper } from "../../common";
import { useDocumentsColums } from "./useDocumentsColums";
import styles from "./DocumentsPage.module.scss";
import { pages, pathname, status } from "../../enums";

const items = [
  { value: "1", label: status.APPROVED },
  { value: "2", label: status.REJECTED },
  { value: "3", label: status.IN_PROCESS },
  { value: "4", label: status.DRAFT },
  { value: "5", label: status.REVISION },
];

export const DocumemtsPage = () => {
  const { columns } = useDocumentsColums();
  const data = JSON.parse(localStorage.getItem("folderArr"));
  const filteredStatus = localStorage.getItem("filteredStatus");

  const statusCount = data?.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  if (data) {
    localStorage.setItem("statusCount", JSON.stringify(statusCount));
  }

  const filteredData = data?.filter((item) => item.status === filteredStatus);

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
          placeholder="Статус документа"
          options={items}
          style={{
            width: "15%",
          }}
        />
      </Flex>

      <Col span={24}>
        <Table
          dataSource={filteredStatus ? filteredData : data}
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
