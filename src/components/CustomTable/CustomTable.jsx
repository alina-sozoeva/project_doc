import { Col, Flex, Table } from "antd";
import styles from "./AgreementTable.module.scss";
import { useAgreementColumns } from "./useAgreementColumns";

import { useState } from "react";
import { InWorkModal } from "../../components";
import {
  useAddDocsStatusesMutation,
  useGetProcessesMembersQuery,
  useUpdateDocsSoglosovanieMutation,
} from "../../store";
import { useProcessesMembers, useUser } from "../../utils";
import { status } from "../../enums";
import { toast } from "react-toastify";
import { ApprovalModal } from "../../common";

export const CustomTable = ({ defult, processId, data, isLoading }) => {
  const user = useUser();
  const [openWarn, setOpenWarn] = useState(false);
  const [openApprov, setOpenApprov] = useState();
  const [docId, setDocId] = useState("");
  const { data: members } = useGetProcessesMembersQuery();
  const [updateDoc] = useUpdateDocsSoglosovanieMutation();
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

  const { columns } = useAgreementColumns(
    handleOpenWarn,
    user,
    processId,
    handleOpenApprov
  );
  const filtered = data?.data?.find((item) => item.guid === docId);
  const filteredMem = members?.data?.filter(
    (item) => item.process_id === processId
  );

  const onConfirm = () => {
    updateDoc({
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

  return (
    <Flex vertical gap="small">
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
      />
    </Flex>
  );
};
