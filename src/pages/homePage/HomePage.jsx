import { useMemo, useState } from "react";
import { Button, Checkbox, Divider, Flex, Select, Table } from "antd";
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
import { BellOutlined, InboxOutlined, StarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import styles from "./HomePage.module.scss";

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

  const columns = [
    {
      key: "guid",
      dataIndex: "guid",
      title: "...",
      width: 60,
      align: "center",
      render: (_, record) => (
        <Flex
          justify="space-around"
          align="center"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox />
          <StarOutlined style={{ color: "#a7a59f" }} />
          {/* <Button onClick={() => handleAddFavorites(record)}>В изр</Button> */}
        </Flex>
      ),
    },
    {
      key: "employee",
      dataIndex: "employee",
      title: "Инициатор",
      render: (_, record) => (
        <p
          className={
            record?.read_status !== 1 && record?.employee?.guid !== user?.guid
              ? "font-bold"
              : ""
          }
          style={{ color: "#5f6368" }}
        >
          {record?.employee?.fio}
        </p>
      ),
    },
    {
      key: "comments",
      dataIndex: "comments",
      title: "Комментарии",
      render: (_, record) => (
        <p style={{ color: "#5f6368" }}>{record?.comments}</p>
      ),
    },
    {
      key: "created_at",
      dataIndex: "created_at",
      title: "Инициатор",
      align: "right",
      render: (_, record) => (
        <div style={{ color: "#5f6368" }}>
          {record?.created_at ? (
            <p>{dayjs(record?.created_at).format("D MMMM")}</p>
          ) : (
            <p>нет даты</p>
          )}
        </div>
      ),
    },
  ];

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

  return (
    <Wrapper path={pathname.HOME} page={true} className={styles.home}>
      <Flex justify="space-between" align="center" gap="middle">
        <Flex align="center" gap="middle">
          <Flex align="center" gap="small">
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
          <Flex align="center" gap="small">
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
    </Wrapper>
  );
};
