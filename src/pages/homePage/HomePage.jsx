import { useMemo, useState } from "react";
import { Button, Col, Divider, Flex, Row, Select, Table } from "antd";
import { Wrapper } from "../../common";
import { pathname, status } from "../../enums";
import { useUser } from "../../utils";
import { useNavigate } from "react-router-dom";
import {
  useAddFavoritesDocsMutation,
  useGetAllDocsQuery,
  useGetDocCountsQuery,
  useUpdateReadStatusMutation,
} from "../../store";
import { BellOutlined, InboxOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "./HomePage.module.scss";
import clsx from "clsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ruLocale from "@fullcalendar/core/locales/ru";
import { useHomeColumns } from "./useHomeColumns";

const statuses = [
  {
    value: status.APPROVED,
    label: status.APPROVED,
  },
  {
    value: status.REJECTED,
    label: status.REJECTED,
  },
  {
    value: status.IN_PROCESS,
    label: status.IN_PROCESS,
  },
  {
    value: status.REVISION,
    label: status.REVISION,
  },
];

const FilterButton = ({ active, onClick, icon: Icon, label, count }) => (
  <Button type={active ? "primary" : "default"} onClick={onClick}>
    <Icon /> {label}:{" "}
    <span>
      <b>{count}</b>
    </span>
  </Button>
);

export const HomePage = () => {
  dayjs.locale("ru");
  const user = useUser();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("myDocs");
  const [docStatusForMe, setDocStatusForMe] = useState();
  const [docStatusMy, setDocStatusMy] = useState();
  const [addFavorites] = useAddFavoritesDocsMutation();

  const handleAddFavorites = (record) => {
    addFavorites({
      user_guid: user?.guid,
      doc_guid: record?.guid,
    });
  };

  const { columns } = useHomeColumns({ user, handleAddFavorites });

  const handleStatusForMeChange = (value) => {
    setDocStatusForMe(value);
    setDocStatusMy(undefined);
    setActiveFilter("incoming");
  };

  const handleStatusMyChange = (value) => {
    setDocStatusMy(value);
    setDocStatusForMe(undefined);
    setActiveFilter("myDocs");
  };

  const { data: forUserDocs, isLoading: forUserDocsLoading } =
    useGetDocCountsQuery({
      employee_id: user?.guid,
    });
  const { data: userDocs, isLoading: userDocsLoading } = useGetAllDocsQuery(
    { user_id: user?.guid },
    { skip: !user?.guid }
  );
  const [updateReadStatus] = useUpdateReadStatusMutation();

  const counts = useMemo(() => {
    const unreadFiltered = forUserDocs?.docs?.filter(
      (item) => item?.read_status !== 1
    );
    return {
      myDocs: userDocs?.data?.length || 0,
      incoming: forUserDocs?.docs?.length || 0,
      unread: unreadFiltered?.length || 0,
    };
  }, [forUserDocs, userDocs]);

  const filteredDocs = useMemo(() => {
    if (docStatusForMe) {
      return (
        forUserDocs?.docs?.filter((item) => item?.status === docStatusForMe) ||
        []
      );
    }

    if (docStatusMy) {
      return (
        userDocs?.data?.filter((item) => item?.status === docStatusMy) || []
      );
    }

    switch (activeFilter) {
      case "incoming":
        return forUserDocs?.docs || [];
      case "unread":
        return (
          forUserDocs?.docs?.filter((item) => item?.read_status !== 1) || []
        );
      case "myDocs":
      default:
        return userDocs?.data || [];
    }
  }, [activeFilter, docStatusForMe, docStatusMy, forUserDocs, userDocs]);

  const handleNavigate = (record) => {
    if (record?.read_status !== 1) {
      updateReadStatus({
        guid: record?.guid,
        read_status: 1,
      });
    }
    navigate(`/document/${record?.guid}`);
  };

  const onFilterButton = (name) => {
    if (name === "myDocs") {
      setActiveFilter("myDocs");
      setDocStatusForMe(undefined);
    }

    if (name === "incoming") {
      setActiveFilter("incoming");
      setDocStatusMy(undefined);
    }

    if (name === "unread") {
      setActiveFilter("unread");
      setDocStatusForMe(undefined);
      setDocStatusMy(undefined);
    }
  };

  const [events, setEvents] = useState([
    { title: "event 1", date: "2025-07-01" },
    { title: "event 2", date: "2025-07-02" },
  ]);

  const handleDateSelect = (selectInfo) => {
    const title = prompt("Название события?");
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          title,
          date: selectInfo.startStr,
        },
      ]);
    }
  };

  return (
    <Wrapper path={pathname.HOME} page={true} className={styles.home}>
      <Row gutter={24}>
        <Col span={12}>
          <Flex justify="space-between" align="center" gap="middle">
            <Flex align="center" gap="middle" wrap="wrap">
              <Flex vertical gap="small">
                <h2>Задачи мне:</h2>
                <Select
                  allowClear
                  placeholder="Выберете статус"
                  style={{ width: 150 }}
                  onChange={handleStatusForMeChange}
                  options={statuses}
                  value={docStatusForMe}
                />
              </Flex>
              <Flex vertical gap="small">
                <h2>Задачи от меня:</h2>
                <Select
                  allowClear
                  placeholder="Выберете статус"
                  style={{ width: 150 }}
                  onChange={handleStatusMyChange}
                  options={statuses}
                  value={docStatusMy}
                />
              </Flex>

              <FilterButton
                active={activeFilter === "myDocs"}
                onClick={() => onFilterButton("myDocs")}
                icon={InboxOutlined}
                label="Мои документы"
                count={counts.myDocs}
              />

              <FilterButton
                active={activeFilter === "incoming"}
                onClick={() => onFilterButton("incoming")}
                icon={InboxOutlined}
                label="Входящие"
                count={counts.incoming}
              />

              <FilterButton
                active={activeFilter === "unread"}
                onClick={() => onFilterButton("unread")}
                icon={BellOutlined}
                label="Непрочитанные"
                count={counts.unread}
              />
            </Flex>
          </Flex>

          <Divider className="my-5" />

          <Table
            loading={forUserDocsLoading || userDocsLoading}
            showHeader={false}
            columns={columns}
            dataSource={filteredDocs}
            onRow={(record) => ({
              onClick: () => handleNavigate(record),
            })}
          />
        </Col>
        <Col span={12} className={clsx("")}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={ruLocale}
            selectable={true}
            select={handleDateSelect}
            events={events}
          />
        </Col>
      </Row>
    </Wrapper>
  );
};
