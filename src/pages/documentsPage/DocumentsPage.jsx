import { Button, Col, Flex, Input, Select, Table } from "antd";
import {
  FilterOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FolderModal, Wrapper } from "../../common";
import { useDocumentsColums } from "./useDocumentsColums";
import styles from "./DocumentsPage.module.scss";
import { pages, pathname, status } from "../../enums";
import { useState } from "react";
import { employeeInfo } from "../../utils";
import { useSelector } from "react-redux";

const items = [
  { value: "1", label: status.APPROVED },
  { value: "2", label: status.REJECTED },
  { value: "3", label: status.IN_PROCESS },
  { value: "4", label: status.DRAFT },
  { value: "5", label: status.REVISION },
];

export const DocumemtsPage = () => {
  const documents = useSelector((state) => state.documents.documents);
  const [open, setOpen] = useState(false);
  const { columns } = useDocumentsColums();
  const data = documents?.filter(
    (item) => item?.employee?.email === employeeInfo()?.email
  );

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.DOCUMENTS}
      title={pages.DOCUMENTS}
      page={true}
    >
      <Flex gap="small" justify="space-between">
        <Flex gap="small">
          {/* <Button type="primary" onClick={() => handleSetMessageFilter(false)}>
            Мои документы
          </Button>
          <Button type="primary" onClick={() => handleSetMessageFilter(true)}>
            Документы на проверку
          </Button> */}
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
      </Flex>

      <Col span={24}>
        <Table
          dataSource={data}
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
