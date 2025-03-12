import { Wrapper } from "../../common";
import { pages, pathname } from "../../enums";

export const FoldersPage = () => {
  return (
    <Wrapper path={pathname.FOLDERS} title={pages.FOLDERS} page={true}>
      <>FoldersPage</>
    </Wrapper>
  );
};
