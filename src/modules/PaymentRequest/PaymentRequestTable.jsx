import { Button, Col, Flex, Input, Select, Table } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./PaymentRequestTable.module.scss";
import { documentsArr } from "../../data";
import { usePaymentRequestColumns } from "./usePaymentRequestColumns";
import { status } from "../../enums";
import { useState } from "react";
import { InWorkModal } from "../../components";
import { PaymentRequestModal } from "./PaymentRequestModal";
import {
  useGetDocsVyplataQuery,
  useGetProcessesMembersQuery,
  useUpdateDocsCloseMutation,
  useUpdateDocsVyplataMutation,
} from "../../store";
import { useUser } from "../../utils";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ApprovalModal } from "../../common";

const defult = {
  request_name: "",
  request_basis: "",
  contragent: "",
  sum: "",
  payment_date: "2025-04-25T18:00:00.000Z",
  budget: "",
  comments: "",
  doc_id: "",
  process_id: "",
  employee_id: "",
};

export const PaymentRequestTable = () => {
  const user = useUser();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [openWarn, setOpenWarn] = useState(false);
  const [openApprov, setOpenApprov] = useState();
  const [docId, setDocId] = useState();
  const { data, isLoading } = useGetDocsVyplataQuery();
  const { data: members } = useGetProcessesMembersQuery();
  const [updateDoc] = useUpdateDocsVyplataMutation();
  const processId = searchParams.get("process_id");

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
      request_name: filtered.request_name,
      request_basis: filtered.request_basis,
      contragent: filtered.contragent,
      sum: filtered.sum,
      payment_date: filtered.payment_date,
      budget: filtered.budget,
      comments: filtered.comments,
      doc_id: filtered.doc_id,
      process_id: filtered.process_id,
      employee_id: filtered.employee_id,
      // ...defult,
      guid: docId,
      status: status.IN_PROCESS,
      member_id: filteredMem[0]?.employee_id,
    });
    toast.success("Вы отправили документ на обработку");
  };

  const onConfirmApp = () => {
    const currentMemberId = filtered.member_id;
    const memberList = filteredMem || [];
    const currentIndex = memberList.findIndex(
      (m) => m.employee_id === currentMemberId
    );

    const isLast = currentIndex === memberList.length - 1;
    updateDoc({
      request_name: filtered.request_name,
      request_basis: filtered.request_basis,
      contragent: filtered.contragent,
      sum: filtered.sum,
      payment_date: filtered.payment_date,
      budget: filtered.budget,
      comments: filtered.comments,
      doc_id: filtered.doc_id,
      process_id: filtered.process_id,
      employee_id: filtered.employee_id,
      guid: docId,
      status: isLast ? status.APPROVED : status.IN_PROCESS,
      member_id: isLast ? "" : memberList[currentIndex + 1]?.employee_id,
    });
    toast.success("Вы отправили документ на обработку");
    setOpenApprov(false);
  };

  const onRegec = () => {
    updateDoc({
      request_name: filtered.request_name,
      request_basis: filtered.request_basis,
      contragent: filtered.contragent,
      sum: filtered.sum,
      payment_date: filtered.payment_date,
      budget: filtered.budget,
      comments: filtered.comments,
      doc_id: filtered.doc_id,
      process_id: filtered.process_id,
      employee_id: filtered.employee_id,
      guid: docId,
      status: status.REJECTED,
      member_id: "",
    });
    setOpenApprov(false);
  };

  const onRevis = () => {
    updateDoc({
      request_name: filtered.request_name,
      request_basis: filtered.request_basis,
      contragent: filtered.contragent,
      sum: filtered.sum,
      payment_date: filtered.payment_date,
      budget: filtered.budget,
      comments: filtered.comments,
      doc_id: filtered.doc_id,
      process_id: filtered.process_id,
      employee_id: filtered.employee_id,
      guid: docId,
      status: status.REVISION,
      member_id: "",
    });
    setOpenApprov(false);
  };

  const filteredData = data?.data.filter(
    (item) =>
      (item?.employee_id === user?.guid && item?.process_id === processId) ||
      item.member_id === user?.guid
  );

  const { columns } = usePaymentRequestColumns(
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
      <InWorkModal
        open={openWarn}
        onCansel={() => setOpenWarn(false)}
        docId={docId}
        onConfirm={onConfirm}
      />
      <PaymentRequestModal
        open={open}
        onCancel={() => setOpen(false)}
        processId={processId}
        user={user}
      />
      <ApprovalModal
        open={openApprov}
        onCancel={() => setOpenApprov(false)}
        onConfirm={onConfirmApp}
        onRegec={onRegec}
        onRevis={onRevis}
      />
    </Flex>
  );
};
