import { RouteButton } from "../../common";
import { Button } from "antd";
import dayjs from "dayjs";
import React from "react";
import foto from "../../assets/28.jpg";
import styles from "./AgreementTable.module.scss";
import { useProcessesMembers } from "../../utils";
import { useGetDocsSoglosovanieQuery, useGetEmployeesQuery } from "../../store";
import { status } from "../../enums";
import { RedoOutlined } from "@ant-design/icons";

export const useAgreementColumns = (
  handleOpenWarn,
  user,
  processId,
  handleOpenApprov
) => {
  const filteredData = useProcessesMembers(processId);
  const { data } = useGetEmployeesQuery();
  const { data: statuses } = useGetDocsSoglosovanieQuery();
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
      key: "guid",
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
      title: "Номер договора",
      dataIndex: "contract_number",
      key: "contract_number",
      width: 100,
    },
    {
      title: "Дата создания",
      dataIndex: "creation_date",
      key: "creation_date",
      width: 150,
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Контрагент",
      dataIndex: "contragent",
      key: "contragent",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },

    {
      title: "Тип договора",
      dataIndex: "contract_type",
      key: "contract_type",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Срок действия",
      dataIndex: "validity_period",
      key: "validity_period",
      width: 100,
      render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Статус согласования",
      dataIndex: "approval_status",
      key: "approval_status",
      width: 100,
      //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
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
