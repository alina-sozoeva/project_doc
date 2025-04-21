import { Button, Col, Flex, Input, Select, Table } from "antd";
import styles from "./AgreementTable.module.scss";
import { documentsArr } from "../../data";
import { useAgreementColumns } from "./useAgreementColumns";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { AgreementModal } from "./AgreementModal";
import { InWorkModal } from "../../components";
import { status } from "../../enums";
import dayjs from "dayjs";

const agreementData = [
  {
    index: 1,
    doc_name: "test",
    user: "Иванов Иван Иванович",
    contract_number: "004",
    creation_date: dayjs().format("DD.MM.YYYY"),
    counterparty: "ООО 'Рога и копыта'",
    contract_type: "Договор аренды",
    validity_period: "12 месяцев",
    approval_status: "На согласовании",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.PENDING },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 2,
    user: "Петров Петр Петрович",
    doc_name: "test",
    contract_number: "005",
    creation_date: dayjs().format("DD.MM.YYYY"),
    counterparty: "АО 'Золотая рыбка'",
    contract_type: "Договор поставки",
    validity_period: "24 месяца",
    approval_status: "Согласован",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.REJECTED },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 3,
    user: "Сидоров Сидор Сидорович",
    doc_name: "test",
    contract_number: "006",
    creation_date: dayjs().format("DD.MM.YYYY"),
    counterparty: "ООО 'Строитель'",
    contract_type: "Договор подряда",
    validity_period: "6 месяцев",
    approval_status: "На согласовании",
    record: [
      { step: 1, status: status.PENDING },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  // Добавь ещё записи по аналогии
];

export default agreementData;

export const AgreementTable = () => {
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);

  const handleOpenWarn = () => {
    setOpenWarn(true);
  };

  const { columns } = useAgreementColumns(handleOpenWarn);

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
          dataSource={agreementData}
          columns={columns}
          pagination={false}
          className={styles.table}
          bordered
          scroll={{ y: 480, x: 1400 }}
        />
      </Col>

      <AgreementModal open={open} onCancel={() => setOpen(false)} />
      <InWorkModal open={openWarn} onCansel={() => setOpenWarn(false)} />
    </Flex>
  );
};
