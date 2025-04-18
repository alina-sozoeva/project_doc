import { Col, Table } from "antd";
import styles from "./CloseDocumentsTable.module.scss";
import { documentsArr } from "../../data";
import { useCloseDocumentsColumns } from "./useCloseDocumentsColumns";
import { status } from "../../enums";
import dayjs from "dayjs";
import { useState } from "react";
import { InWorkModal } from "../../components";

const closeDocumentsData = [
  {
    index: 1,
    user: "Иванов Иван Иванович",
    process_name: "Закрытие договора аренды",
    basis_document: "Договор 001",
    close_date: dayjs().format("DD.MM.YYYY"),
    close_status: "Закрыт",
    comment: "Договор завершен, выполнение обязательств окончено.",
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
    process_name: "Закрытие договора поставки",
    basis_document: "Договор 002",
    close_date: dayjs().format("DD.MM.YYYY"),
    close_status: "В процессе",
    comment: "Требуется проверка окончательной документации.",
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
    process_name: "Закрытие договора подряда",
    basis_document: "Договор 003",
    close_date: dayjs().format("DD.MM.YYYY"),
    close_status: "Закрыт",
    comment: "Работы завершены, договор закрыт.",
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

export const CloseDocumentsTable = () => {
  const [openWarn, setOpenWarn] = useState(false);

  const handleOpenWarn = () => {
    setOpenWarn(true);
  };

  const { columns } = useCloseDocumentsColumns(handleOpenWarn);
  return (
    <Col span={24}>
      <Table
        dataSource={closeDocumentsData}
        columns={columns}
        pagination={false}
        className={styles.table}
        bordered
        scroll={{ y: 480, x: 1400 }}
      />
      <InWorkModal open={openWarn} onCansel={() => setOpenWarn(false)} />
    </Col>
  );
};
