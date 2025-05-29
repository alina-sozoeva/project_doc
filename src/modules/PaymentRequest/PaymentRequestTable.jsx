import { Button, Flex, Input, Select } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import { CustomTable } from "../../components";
import { PaymentRequestModal } from "./PaymentRequestModal";
import {
  useGetDocsVyplataQuery,
  useUpdateDocsVyplataMutation,
} from "../../store";
import { useUser } from "../../utils";
import { useSearchParams } from "react-router-dom";
import { columnsPaymentItem } from "./columnsPaymentItem";

export const PaymentRequestTable = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const processId = searchParams.get("process_id");
  const { data: filteredData, isLoading } = useGetDocsVyplataQuery({
    process_id: processId,
    employee_id: user?.guid,
  });
  const [updateDoc] = useUpdateDocsVyplataMutation();

  //   const filteredData = data?.data.filter(
  //   (item) =>
  //     (item?.employee_id === user?.guid && item?.process_id === processId) ||
  //     item.member_id === user?.guid
  // );
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
        columnsItem={columnsPaymentItem}
        updateDoc={updateDoc}
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
