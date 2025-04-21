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

const purchaseRequestData = [
  {
    index: 1,
    user: "Иванов Иван Иванович",
    doc_name: "Заявка на закупку №101",
    budget: "Закупка канцелярии",
    counterparty: "ООО КанцТорг",
    end_date: "30.04.2025",
    comment: "Необходимо срочное исполнение",
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
    doc_name: "Заявка на закупку №102",
    budget: "Ремонт компьютеров",
    counterparty: "ООО ТехноРемонт",
    end_date: "10.05.2025",
    comment: "Ожидается подтверждение от поставщика",
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
    doc_name: "Заявка на закупку №103",
    budget: "Ремонт и обслуживание",
    counterparty: "ЗАО РемонтСервис",
    end_date: "15.05.2025",
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

export const PurchaseRequestTable = () => {
  const [open, setOpen] = useState(false);

  const [openWarn, setOpenWarn] = useState(false);

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
          dataSource={purchaseRequestData}
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
