import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";

import styles from "./FavoritesPage.module.scss";

export const FavoritesPage = () => {
  return (
    <Wrapper
      className={styles.content}
      title={pages.FAVORITES}
      path={pathname.FAVORITES}
      page={true}
    >
      HistoryPage
    </Wrapper>
  );
};
