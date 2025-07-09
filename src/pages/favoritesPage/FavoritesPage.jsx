import { Button, Checkbox, Flex, Table } from "antd";
import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { useGetFavoritesDocsQuery } from "../../store";
import { useUser } from "../../utils";

import styles from "./FavoritesPage.module.scss";
import dayjs from "dayjs";
import { StarOutlined } from "@ant-design/icons";
import "dayjs/locale/ru";
import { useFavoritesColumns } from "./useFavoritesColumns";

export const FavoritesPage = () => {
  const user = useUser();
  const { data, isLoading } = useGetFavoritesDocsQuery(
    { user_id: user?.guid },
    { skip: !user?.guid }
  );

  const { columns } = useFavoritesColumns({ user });

  console.log(data?.favorites, "data");

  return (
    <Wrapper
      className={styles.content}
      title={pages.FAVORITES}
      path={pathname.FAVORITES}
      page={true}
    >
      <Table
        loading={isLoading}
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
