import { Button, Col, Flex, Input, Select, Table } from "antd";
import styles from "./CloseDocumentsTable.module.scss";
import { documentsArr } from "../../data";
import { useCloseDocumentsColumns } from "./useCloseDocumentsColumns";
import { status } from "../../enums";
import dayjs from "dayjs";
import { useState } from "react";
import { InWorkModal } from "../../components";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CloseDocumentsModal } from "./CloseDocumentsModal";
import { useGetDocsCloseQuery } from "../../store";

export const CloseDocumentsTable = () => {
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);

  const { data, isLoading } = useGetDocsCloseQuery();

  const handleOpenWarn = () => {
    setOpenWarn(true);
  };

  const { columns } = useCloseDocumentsColumns(handleOpenWarn);

  return (
    <Flex vertical gap="small">
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
            // options={items}
            style={{
              width: "80px",
            }}
          />
          <Select
            placeholder="Месяц"
            // options={items}
            style={{
              width: "100px",
            }}
          />
          <Select
            placeholder="Статус документа"
            // options={items}
            style={{
              width: "150px",
            }}
          />
          <Button>
            <FilterOutlined />
          </Button>
          <Button>
            <RedoOutlined />
          </Button>
        </Flex>
        <Button type="primary" onClick={() => setOpen(true)}>
          <PlusOutlined /> Добавить документ
        </Button>
      </Flex>
      <Col span={24}>
        <Table
          loading={isLoading}
          dataSource={data && data?.data}
          columns={columns}
          pagination={false}
          className={styles.table}
          bordered
          scroll={{ y: 480, x: 1400 }}
        />
      </Col>
      <InWorkModal open={openWarn} onCansel={() => setOpenWarn(false)} />
      <CloseDocumentsModal open={open} onCancel={() => setOpen(false)} />
    </Flex>
  );
};
