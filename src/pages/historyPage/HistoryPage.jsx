import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";

import styles from "./HistoryPage.module.scss";

export const HistoryPage = () => {
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
