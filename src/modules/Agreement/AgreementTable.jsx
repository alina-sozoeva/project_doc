import { Button, Col, Flex, Input, Select, Table } from "antd";
import styles from "./AgreementTable.module.scss";
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
import { useGetDocsSoglosovanieQuery } from "../../store";
import { useUser } from "../../utils";
import { useSearchParams } from "react-router-dom";

export const AgreementTable = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const { data, isLoading } = useGetDocsSoglosovanieQuery();
  const processId = searchParams.get("process_id");

  const handleOpenWarn = (values) => {
    setOpenWarn(true);
  };

  const { columns } = useAgreementColumns(handleOpenWarn);

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

      <AgreementModal
        open={open}
        onCancel={() => setOpen(false)}
        processId={processId}
      />
      <InWorkModal open={openWarn} onCansel={() => setOpenWarn(false)} />
    </Flex>
  );
};
