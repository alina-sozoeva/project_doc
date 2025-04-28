import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./CounterpartyTable.module.scss";
import {
  useGetDocsStatusesQuery,
  useGetEmployeesQuery,
  useGetProcessesMembersQuery,
} from "../../store";
import { useProcessesMembers } from "../../utils";
import { status } from "../../enums";
import { RedoOutlined } from "@ant-design/icons";

export const useCounterpartyColums = (
  handleOpenWarn,
  user,
  processId,
  handleOpenApprov
) => {
  const filteredData = useProcessesMembers(processId);
  const { data } = useGetEmployeesQuery();
  const { data: statuses } = useGetDocsStatusesQuery();
  const filteredStatuses = (guid) =>
    statuses?.data?.filter((item) => {
      return item.docs_id === guid;
    });

  const getLastStatusForStep = (guid, employeeId) => {
    const statusesForDoc = filteredStatuses(guid);

    const statusesForStep = statusesForDoc
      ?.filter((status) => status.member_id === employeeId)
      ?.sort((a, b) => new Date(a.create_at) - new Date(b.create_at));

    return statusesForStep?.[statusesForStep.length - 1];
  };

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 30,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Инициатор",
      dataIndex: "employee_id",
      key: "employee_id",
      width: 100,
      render: (_, record) => {
        const filtered = data?.data?.find(
          (item) => item.guid === record.employee_id
        );
        return (
          <>
            <p>{filtered.fio}</p>
            <p>{filtered.email}</p>
          </>
        );
      },
    },
    {
      title: "Наименование компании",
      dataIndex: "company_name",
      key: "company_name",
      width: 100,
    },
    {
      title: "Юридический адрес",
      dataIndex: "legal_address",
      key: "legal_address",
      width: 150,
      //   render: (_, record) => record.data.contract_number,
    },
    {
      title: "Фактический адрес",
      dataIndex: "actual_address",
      key: "actual_address",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },

    {
      title: "Контактное лицо",
      dataIndex: "fio",
      key: "fio",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Статус проверки",
      dataIndex: "verification_status",
      key: "verification_status",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Маршрут",
      dataIndex: "data",
      key: "data",
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
                {/* {step.employee_id === record.member_id && <RedoOutlined />} */}
                <RouteButton
                  item={step}
                  statusFolder={lastStatus && lastStatus.status}
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
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => handleOpenWarn(record.guid)}
            >
              В работу
            </Button>
          );
        }

        if (record.status === status.IN_PROCESS) {
          return (
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => handleOpenApprov(record.guid)}
              disabled={isInitiator}
            >
              Утвердить
            </Button>
          );
        }

        if (record.status === status.REJECTED) {
          return (
            <Button type="primary" danger className={styles.btn}>
              Удалить
            </Button>
          );
        }

        if (record.status === status.APPROVED) {
          return <Button className={styles.btn}>Сохранить</Button>;
        }
      },
    },
  ];

  return {
    columns,
  };
};
