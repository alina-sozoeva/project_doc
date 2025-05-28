import { Button, Flex, Input, Select } from "antd";
import { columnsAgreementItem } from "./columnsAgreementItem";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { AgreementModal } from "./AgreementModal";
import { CustomTable } from "../../components";
import {
  useGetDocsSoglosovanieQuery,
  useUpdateDocsSoglosovanieMutation,
} from "../../store";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../utils";

export const AgreementTable = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const processId = searchParams.get("process_id");
  const { data: filteredData, isLoading } = useGetDocsSoglosovanieQuery({
    employee_id: user?.guid,
    process_id: processId,
  });
  const [updateDoc] = useUpdateDocsSoglosovanieMutation();

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
        <Button
          type="primary"
          onClick={() => setOpen(true)}
          // disabled={isInitiator}
        >
          <PlusOutlined /> Добавить документ
        </Button>
      </Flex>
      <CustomTable
        isLoading={isLoading}
        filteredData={filteredData}
        processId={processId}
        columnsItem={columnsAgreementItem}
        updateDoc={updateDoc}
      />

      <AgreementModal
        open={open}
        onCancel={() => setOpen(false)}
        processId={processId}
        user={user}
      />
    </Flex>
  );
};
