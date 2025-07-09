import { StarOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { StatusButton } from "../../common";
import dayjs from "dayjs";
import "dayjs/locale/ru";

export const useHomeColumns = ({ user, handleAddFavorites }) => {
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
          <StarOutlined
            style={{ color: "#a7a59f" }}
            onClick={() => handleAddFavorites(record)}
          />
        </Flex>
      ),
    },
    {
      key: "employee",
      dataIndex: "employee",
      title: "Cотрудник",
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
      key: "status",
      dataIndex: "status",
      title: "Статус",
      align: "center",
      render: (text, _, __) => (
        <StatusButton statusFolder={text}>{text}</StatusButton>
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
      title: "Дата создания",
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

  return { columns };
};
