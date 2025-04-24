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
import { useUser } from "../../utils";
import { useSearchParams } from "react-router-dom";

export const PaymentRequestTable = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const [docId, setDocId] = useState("");
  const { data, isLoading } = useGetDocsVyplataQuery();
  const processId = searchParams.get("process_id");

  const handleOpenWarn = (guid) => {
    setDocId(guid);
    setOpenWarn(true);
  };

  const { columns } = usePaymentRequestColumns(handleOpenWarn, user, processId);

  const filteredData = data?.data.filter(
    (item) => item.employee_id === user.guid && item.process_id === processId
  );

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
          dataSource={filteredData || []}
          columns={columns}
          pagination={false}
          className={styles.table}
          bordered
          scroll={{ y: 480, x: 1400 }}
        />
      </Col>
      <InWorkModal
        open={openWarn}
        onCansel={() => setOpenWarn(false)}
        docId={docId}
      />
      <PaymentRequestModal
        open={open}
        onCancel={() => setOpen(false)}
        processId={processId}
        user={user}
      />
    </Flex>
  );
};
