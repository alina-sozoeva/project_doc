import { Wrapper } from "../../common";
import { Itinerary } from "../../components";
import styles from './EditFolderPage.module.scss'

export const EditFolderPage = () => {
  return (
    <Wrapper className={styles.content}>
      <div>
        Редактироание
      </div>
      <Itinerary />
    </Wrapper>
  );
};
