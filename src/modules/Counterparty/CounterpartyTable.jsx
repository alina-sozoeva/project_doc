import { Button, Col, Flex, Input, Select, Table } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./CounterpartyTable.module.scss";
import { useCounterpartyColums } from "./useCounterpartyColums";
import { documentsArr } from "../../data";
import { status } from "../../enums";
import { InWorkModal } from "../../components";
import { useState } from "react";
import { CunterpartyModal } from "./CounterpartyModal";

const counterpartyData = [
  {
    index: 1,
    user: "Иванов Иван Иванович",
    company_name: "ООО Рога и Копыта",
    legal_address: "Москва, ул. Ленина, 1",
    actual_address: "Москва, ул. Пушкина, 2",
    contact_person: "Петр Петров",
    verification_status: "Пройдено",
    record: [
      { step: 1, status: status.PENDING },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.COMPLETED },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 2,
    user: "Петров Петр Петрович",
    company_name: "ООО Строительный Центр",
    legal_address: "Санкт-Петербург, ул. Советская, 45",
    actual_address: "Санкт-Петербург, ул. Некрасова, 10",
    contact_person: "Иван Иванов",
    verification_status: "На проверке",
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
    company_name: "ЗАО ТехноПром",
    legal_address: "Екатеринбург, ул. Дзержинского, 10",
    actual_address: "Екатеринбург, ул. Грибоедова, 15",
    contact_person: "Алексей Алексеев",
    verification_status: "Пройдено",
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

export const CounterpartyTable = () => {
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);

  const handleOpenWarn = () => {
    setOpenWarn(true);
  };

  const { columns } = useCounterpartyColums(handleOpenWarn);

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
          dataSource={counterpartyData}
          columns={columns}
          pagination={false}
          className={styles.table}
          bordered
          scroll={{ y: 480, x: 1400 }}
        />
      </Col>
      <InWorkModal open={openWarn} onCansel={() => setOpenWarn(false)} />
      <CunterpartyModal open={open} onCancel={() => setOpen(false)} />
    </Flex>
  );
};
