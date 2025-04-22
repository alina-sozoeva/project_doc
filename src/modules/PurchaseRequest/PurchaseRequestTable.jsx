import { Button, Col, Flex, Input, Select, Table } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { documentsArr } from "../../data";
import styles from "./PurchaseRequestTable.module.scss";
import { usePurchaseRequestColumns } from "./usePurchaseRequestColumns";
import { status } from "../../enums";
import { useState } from "react";
import { InWorkModal } from "../../components";
import { PurchaseRequestModal } from "./PurchaseRequestModal";
import { useGetDocsZakupQuery } from "../../store";

export const PurchaseRequestTable = () => {
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const { data, isLoading } = useGetDocsZakupQuery();

  const handleOpenWarn = () => {
    setOpenWarn(true);
  };
  const { columns } = usePurchaseRequestColumns(handleOpenWarn);

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
      <PurchaseRequestModal open={open} onCancel={() => setOpen(false)} />
    </Flex>
  );
};
