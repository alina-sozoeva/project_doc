import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import { useGetHistoryStatusesQuery } from "../../store";
import { useUser } from "../../utils";

import styles from "./HistoryPage.module.scss";

export const HistoryPage = () => {
  const user = useUser();

  const { data } = useGetHistoryStatusesQuery(
    { user_id: user?.guid },
    { skip: !user?.guid }
  );

  console.log(data);

  return (
    <Wrapper
      className={styles.content}
      title={pages.HISTORY}
      path={pathname.HISTORY}
      page={true}
    >
      HistoryPage
    </Wrapper>
  );
};
