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

const paymentRequestData = [
  {
    index: 1,
    user: "Иванов Иван Иванович",
    request_name: "Заявка на оплату №123",
    request_basis: "Договор 001",
    counterparty: "ООО Рога и Копыта",
    payment_date: "25.04.2025",
    budget_item: "Расходы на закупку",
    comment: "Согласовано с бухгалтерией",
    record: [
      { step: 1, status: status.PENDING },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 2,
    user: "Петров Петр Петрович",
    request_name: "Заявка на оплату №124",
    request_basis: "Договор 002",
    counterparty: "ООО Строительный Центр",
    payment_date: "30.04.2025",
    budget_item: "Ремонт оборудования",
    comment: "Ожидается подтверждение от контрагента",
    record: [
      { step: 1, status: status.PENDING },
      { step: 2, status: status.PENDING },
      { step: 3, status: status.REJECTED },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.APPROVED },
    ],
  },
  {
    index: 3,
    user: "Сидоров Сидор Сидорович",
    request_name: "Заявка на оплату №125",
    request_basis: "Договор 003",
    counterparty: "ЗАО ТехноПром",
    payment_date: "05.05.2025",
    budget_item: "Ремонт и обслуживание",
    comment: "Потребуется дополнительное согласование",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.PENDING },
      { step: 3, status: status.COMPLETED },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  // Добавь ещё записи по аналогии
];

export const PaymentRequestTable = () => {
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);

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
          dataSource={paymentRequestData}
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
