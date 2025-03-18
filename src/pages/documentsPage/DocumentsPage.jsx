import { Button, Col, Flex, Input, Select, Table } from "antd";
import {
  CloseCircleOutlined,
  FilterOutlined,
  FolderAddOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FolderModal, Wrapper } from "../../common";
import { useDocumentsColums } from "./useDocumentsColums";
import styles from "./DocumentsPage.module.scss";
import { pages, pathname, status } from "../../enums";
import { useState } from "react";
import { dataSource } from "../../data";

const items = [
  { value: "1", label: status.APPROVED },
  { value: "2", label: status.REJECTED },
  { value: "3", label: status.IN_PROCESS },
  { value: "4", label: status.DRAFT },
  { value: "5", label: status.REVISION },
];

export const DocumemtsPage = () => {
  const [open, setOpen] = useState(false);
  const { columns } = useDocumentsColums();
  // const data = JSON.parse(localStorage.getItem("folderArr"));
  const filteredStatus = localStorage.getItem("filteredStatus");

  const onClose = () => {
    setOpen(false);
  };

  const statusCount = dataSource?.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  if (dataSource) {
    localStorage.setItem("statusCount", JSON.stringify(statusCount));
  }

  const filteredData = dataSource?.filter(
    (item) => item.status === filteredStatus
  );

  return (
    <Wrapper
      className={styles.content}
      path={pathname.DOCUMENTS}
      title={pages.DOCUMENTS}
      page={true}
    >
      <Flex gap="small" justify="space-between">
        <Flex gap="small">
          <Input
            placeholder="Поиск по инициатору"
            prefix={<SearchOutlined />}
            style={{
              width: "200px",
            }}
          />
          <Select
            placeholder="Год"
            options={items}
            style={{
              width: "80px",
            }}
          />
          <Select
            placeholder="Месяц"
            options={items}
            style={{
              width: "100px",
            }}
          />
          <Select
            placeholder="Статус документа"
            options={items}
            style={{
              width: "150px",
            }}
          />
          <Button type="primary">
            <FilterOutlined />
          </Button>
          <Button type="primary">
            <RedoOutlined />
          </Button>
        </Flex>
        <Flex gap="small">
          <Button type="primary" onClick={() => setOpen(true)}>
            <FolderAddOutlined />
            Добавить документ
          </Button>
        </Flex>
      </Flex>

      <Col span={24}>
        <Table
          dataSource={filteredStatus ? filteredData : dataSource}
          columns={columns}
          pagination={false}
          className={styles.table}
          bordered
          scroll={{ y: 480 }}
        />
      </Col>
      <FolderModal open={open} onCancel={onClose} />
    </Wrapper>
  );
};
