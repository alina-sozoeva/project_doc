import { Col, Table } from "antd";
import { documentsArr } from "../../data";
import { useDocumentsColums } from "./useDocumentsColums";
import styles from "./DocumentsPage.module.scss";
import { useState } from "react";
import { AddAgreementModal } from "../../components";

export const DocumentsTable = () => {
  const { columns } = useDocumentsColums();
  const [open, setOpen] = useState(false);

  return (
    <Col span={24}>
      <Table
        dataSource={documentsArr}
        columns={columns}
        pagination={false}
        className={styles.table}
        bordered
        scroll={{ y: 480, x: 1400 }}
      />
    </Col>
  );
};
