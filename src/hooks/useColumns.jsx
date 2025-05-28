import { Button } from "antd";
import React, { useState } from "react";
import { useProcessesMembers } from "../utils/useProcessesMembers";
import { useGetDocsStatusesQuery } from "../store";
import { RouteButton } from "../common";
import { status } from "../enums";

export const useColumns = (
  handleOpenWarn,
  user,
  processId,
  handleOpenApprov,
  columnsItem
) => {
  const filteredData = useProcessesMembers(processId);
  const [docsId, setDocsIg] = useState();
  const [memberId, setMemberIg] = useState();

  const { data: statuses } = useGetDocsStatusesQuery(docsId, memberId);
  const filteredStatuses = (guid) =>
    statuses?.data?.filter((item) => {
      return item.docs_id === guid;
    });

  const getLastStatusForStep = (guid, employeeId) => {
    const statusesForDoc = filteredStatuses(guid);
    setDocsIg(guid);
    setMemberIg(employeeId);
    const statusesForStep = statusesForDoc
      ?.filter((status) => status.member_id === employeeId)
      ?.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));

    return statusesForStep?.[statusesForStep.length - 1];
  };

  const columns = [
    ...columnsItem,
    {
      title: "Маршрут",
      key: "guid",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="chain_container">
          {filteredData?.map((step, index) => {
            const lastStatus = getLastStatusForStep(
              record.guid,
              step.employee_id
            );

            return (
              <React.Fragment key={step.employee_id}>
                <RouteButton
                  item={step}
                  statusFolder={lastStatus && lastStatus.status}
                  inProcess={step.employee_id === record.member_id}
                ></RouteButton>
                {index < filteredData?.length - 1 && <div className="arrow" />}
              </React.Fragment>
            );
          })}
        </div>
      ),
    },
    {
      title: "...",
      key: "guid",
      dataIndex: "guid",
      align: "center",
      width: 100,
      render: (_, record) => {
        const isInitiator = record.employee_id === user.guid;

        if (
          record.status === status.DRAFT ||
          record.status === status.REVISION
        ) {
          return (
            <Button type="primary" onClick={() => handleOpenWarn(record.guid)}>
              В работу
            </Button>
          );
        }

        if (record.status === status.IN_PROCESS) {
          return (
            <Button
              type="primary"
              onClick={() => handleOpenApprov(record.guid)}
              disabled={isInitiator}
            >
              Утвердить
            </Button>
          );
        }

        if (record.status === status.REJECTED) {
          return (
            <Button type="primary" danger>
              Удалить
            </Button>
          );
        }

        if (record.status === status.APPROVED) {
          return <Button>Сохранить</Button>;
        }
      },
    },
  ];

  return {
    columns,
  };
};
