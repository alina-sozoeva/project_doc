import { Button, Col, Flex, Input, Select, Table } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./CounterpartyTable.module.scss";
import { useCounterpartyColums } from "./useCounterpartyColums";
import { InWorkModal } from "../../components";
import { useState } from "react";
import { CunterpartyModal } from "./CounterpartyModal";
import {
  useAddDocsStatusesMutation,
  useGetDocsCloseQuery,
  useGetDocsContragentQuery,
  useGetProcessesMembersQuery,
  useUpdateDocsContragentMutation,
} from "../../store";
import { useProcessesMembers, useUser } from "../../utils";
import { useSearchParams } from "react-router-dom";
import { status } from "../../enums";
import { toast } from "react-toastify";
import { ApprovalModal } from "../../common";

const defult = {
  nameid_contragent: 1,
  company_name: "",
  inn: "",
  legal_address: "",
  actual_address: "",
  fio: "",
  phone: "",
  email: "",
  bank_details: "",
  verification_status: "",
  doc_id: "",
  process_id: "",
  employee_id: "",
};

export const CounterpartyTable = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const [openApprov, setOpenApprov] = useState();
  const [docId, setDocId] = useState();
  const { data, isLoading } = useGetDocsContragentQuery();
  const { data: members } = useGetProcessesMembersQuery();
  const [updateDoc] = useUpdateDocsContragentMutation();
  const processId = searchParams.get("process_id");
  const [addStatus] = useAddDocsStatusesMutation();
   const filteredDataMembers = useProcessesMembers(processId);
  
    const isInitiator = filteredDataMembers?.find(
      (item) => item.employee_id === user.guid
    );

  const handleOpenWarn = (guid) => {
    setDocId(guid);
    setOpenWarn(true);
  };

  const handleOpenApprov = (guid) => {
    setDocId(guid);
    setOpenApprov(true);
  };

  const filtered = data?.data?.find((item) => item.guid === docId);
  const filteredMem = members?.data?.filter(
    (item) => item.process_id === processId
  );

  const onConfirm = () => {
    updateDoc({
      // nameid_contragent: filtered.nameid_contragent,
      // company_name: filtered.nameid_contragent,
      // inn: filtered.nameid_contragent,
      // legal_address: filtered.nameid_contragent,
      // actual_address: filtered.nameid_contragent,
      // fio: filtered.nameid_contragent,
      // phone: filtered.nameid_contragent,
      // email: filtered.nameid_contragent,
      // bank_details: filtered.nameid_contragent,
      // verification_status: filtered.nameid_contragent,
      // doc_id: filtered.nameid_contragent,
      // process_id: filtered.nameid_contragent,
      // employee_id: filtered.nameid_contragent,
      ...defult,
      guid: docId,
      status: status.IN_PROCESS,
      member_id: filteredMem[0]?.employee_id,
    });

    toast.success("Вы отправили документ на обработку");
  };

  const currentMemberId = filtered?.member_id;
  const memberList = filteredMem || [];
  const currentIndex = memberList.findIndex(
    (m) => m.employee_id === currentMemberId
  );

  const isLast = currentIndex === memberList.length - 1;

  const onConfirmApp = () => {
    updateDoc({
      ...defult,
      guid: docId,
      status: isLast ? status.APPROVED : status.IN_PROCESS,
      member_id: isLast ? "" : memberList[currentIndex + 1]?.employee_id,
    });

    addStatus({
      docs_id: docId,
      member_id: memberList[currentIndex]?.employee_id,
      status: status.APPROVED,
      comments: "test",
    });
    toast.success("Вы отправили документ на обработку");
    setOpenApprov(false);
  };

  const onRegec = () => {
    updateDoc({
      ...defult,
      guid: docId,
      status: status.REJECTED,
      member_id: "",
    });

    addStatus({
      docs_id: docId,
      member_id: memberList[currentIndex]?.employee_id,
      status: status.REJECTED,
      comments: "test",
    });
    toast.error("Вы отказали в обработке документа");
    setOpenApprov(false);
  };

  const onRevis = () => {
    updateDoc({
      ...defult,
      guid: docId,
      status: status.REVISION,
      member_id: "",
    });

    addStatus({
      docs_id: docId,
      member_id: memberList[currentIndex]?.employee_id,
      status: status.REVISION,
      comments: "test",
    });
    toast.warn("Вы успешно отправили документ на доработку");
    setOpenApprov(false);
  };

  const filteredData = data?.data.filter(
    (item) =>
      (item?.employee_id === user?.guid && item?.process_id === processId) ||
      item.member_id === user?.guid
  );

  const { columns } = useCounterpartyColums(
    handleOpenWarn,
    user,
    processId,
    handleOpenApprov
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
        <Button type="primary" onClick={() => setOpen(true)} disabled={isInitiator}>
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
      <InWorkModal
        open={openWarn}
        onCansel={() => setOpenWarn(false)}
        docId={docId}
        onConfirm={onConfirm}
      />
      <ApprovalModal
        open={openApprov}
        onCancel={() => setOpenApprov(false)}
        onConfirm={onConfirmApp}
        onRegec={onRegec}
        onRevis={onRevis}
        item={filtered}
      />
      <CunterpartyModal
        open={open}
        onCancel={() => setOpen(false)}
        processId={processId}
        user={user}
      />
    </Flex>
  );
};
