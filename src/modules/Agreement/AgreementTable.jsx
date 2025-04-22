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
import { useGetDocsSoglosovanieQuery } from "../../store";
import { employeeInfo } from "../../utils";

export const AgreementTable = () => {
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const { data, isLoading } = useGetDocsSoglosovanieQuery();

  const handleOpenWarn = (values) => {
    setOpenWarn(true);
  };

  console.log(employeeInfo());

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
          loading={isLoading}
          dataSource={data?.data}
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
