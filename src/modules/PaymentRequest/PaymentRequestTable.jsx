import { Button, Col, Flex, Input, Select, Table } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./PaymentRequestTable.module.scss";
import { documentsArr } from "../../data";
import { usePaymentRequestColumns } from "./usePaymentRequestColumns";
import { status } from "../../enums";
import { useState } from "react";
import { InWorkModal } from "../../components";
import { PaymentRequestModal } from "./PaymentRequestModal";
import { useGetDocsVyplataQuery } from "../../store";

export const PaymentRequestTable = () => {
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const { data, isLoading } = useGetDocsVyplataQuery();

  const handleOpenWarn = () => {
    setOpenWarn(true);
  };
  const { columns } = usePaymentRequestColumns(handleOpenWarn);
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
      <PaymentRequestModal open={open} onCancel={() => setOpen(false)} />
    </Flex>
  );
};
