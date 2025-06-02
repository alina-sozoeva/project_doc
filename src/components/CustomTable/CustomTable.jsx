import { Col, Flex, Table } from "antd";
import styles from "./CustomTable.module.scss";

import { useState } from "react";
import { InWorkModal } from "../../components";
import {
  useAddDocsStatusesMutation,
  useGetProcessesMembersQuery,
} from "../../store";
import { useUser } from "../../utils";
import { status } from "../../enums";
import { toast } from "react-toastify";
import { ApprovalModal } from "../../common";
import { useColumns } from "../../hooks";

export const CustomTable = ({
  processId,
  filteredData,
  isLoading,
  columnsItem,
  updateDoc,
}) => {
  const user = useUser();
  const [openWarn, setOpenWarn] = useState(false);
  const [openApprov, setOpenApprov] = useState();
  const [docId, setDocId] = useState("");
  const { data: filteredMem } = useGetProcessesMembersQuery({
    process_id: processId,
    employee_id: user?.guid,
  });
  const [addStatus] = useAddDocsStatusesMutation();

  const handleOpenWarn = (guid) => {
    setDocId(guid);
    setOpenWarn(true);
  };

  const handleOpenApprov = (guid) => {
    setDocId(guid);
    setOpenApprov(true);
  };

  const { columns } = useColumns(
    handleOpenWarn,
    user,
    processId,
    handleOpenApprov,
    columnsItem
  );

  const filtered = filteredData?.data?.find((item) => item.guid === docId);
  const currentMemberId = filtered?.member_id;
  const memberList = filteredMem?.data || [];
  const currentIndex = memberList.findIndex(
    (m) => m.employee_id === currentMemberId
  );

  const isLast = currentIndex === memberList.length - 1;

  const onConfirm = () => {
    updateDoc({
      guid: docId,
      status: status.IN_PROCESS,
      member_id: filteredMem?.data[0]?.employee_id,
    });
    toast.success("Вы отправили документ на обработку");
  };

  const onConfirmApp = () => {
    updateDoc({
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

  return (
    <Flex vertical gap="small">
      <Col span={24}>
        <Table
          loading={isLoading}
          dataSource={filteredData?.data || []}
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
