import { Button, Checkbox, Flex, Table } from "antd";
import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { useGetFavoritesDocsQuery } from "../../store";
import { useUser } from "../../utils";

import styles from "./FavoritesPage.module.scss";
import dayjs from "dayjs";
import { StarOutlined } from "@ant-design/icons";

export const FavoritesPage = () => {
  const user = useUser();
  const { data } = useGetFavoritesDocsQuery(
    { user_id: user?.guid },
    { skip: !user?.guid }
  );

  console.log(data?.favorites, "data");

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
  return (
    <Wrapper
      className={styles.content}
      title={pages.FAVORITES}
      path={pathname.FAVORITES}
      page={true}
    >
      <Table
        // loading={forUserDocsLoading || userDocsLoading}
        showHeader={false}
        columns={columns}
        dataSource={data?.favoriteDocs}
        // onRow={(record) => ({
        //   onClick: () => handleNavigate(record),
        // })}
      />
    </Wrapper>
  );
};
