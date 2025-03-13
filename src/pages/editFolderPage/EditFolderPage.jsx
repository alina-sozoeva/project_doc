import { Wrapper } from "../../common";
import { EditForm, Itinerary } from "../../components";
import { pages, pathname } from "../../enums";
import styles from "./EditFolderPage.module.scss";

export const EditFolderPage = () => {
  return (
    <Wrapper
      className={styles.content}
      path={pathname.EDIT_FOLDER}
      title={pages.EDIT_FOLDER}
      page={true}
    >
      <EditForm />
      <Itinerary />
    </Wrapper>
  );
};
