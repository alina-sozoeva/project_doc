import { Flex } from "antd";
import { Wrapper } from "../../common";
import { EditForm, Itinerary } from "../../components";
import { pages, pathname } from "../../enums";
import styles from "./EditFolderPage.module.scss";

export const EditFolderPage = () => {
  
  return (
    <Wrapper
      className={styles.content}
      path={pathname.DOCUMENTS}
      pathChildter={pathname.EDIT_FOLDER}
      title={pages.DOCUMENTS}
      descrip={pages.EDIT_FOLDER}
      page={true}
    >
      <Flex justify="space-between">
        <div style={{ flex: 1 }}>
          <EditForm />
        </div>
        <div>
          <Itinerary />
        </div>
      </Flex>
    </Wrapper>
  );
};
