import { Button, Flex, Input } from "antd";
import { DocumentButton, Wrapper } from "../../common";
import { pages, pathname } from "../../enums";
import styles from "./AddDocumentPage.module.scss";
import { FolderAddOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AddCunterpartyModal, PurchaseRequestModal } from "../../components";

export const AddDocumentPage = () => {
  const [openCunterparty, setOpenCunterparty] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);

  const onCloseCunterparty = () => {
    setOpenCunterparty(false);
  };

  const onCloseRequest = () => {
    setOpenRequest(false);
  };

  return (
    <Wrapper
      className={styles.content}
      path={pathname.ADD_DOCUMENT}
      title={pages.ADD_DOCUMENT}
      page={true}
    >
      <Flex justify="space-between">
        <Input
          placeholder="Поиск"
          prefix={<SearchOutlined />}
          style={{
            width: "20%",
          }}
        />
      </Flex>
      <Flex vertical gap={"small"}>
        <DocumentButton onClick={() => setOpenCunterparty(true)}>
          Создание карточки контрагента
        </DocumentButton>
        <DocumentButton>Согласование договора</DocumentButton>
        <DocumentButton onClick={() => setOpenRequest(true)}>
          Формирование заявок на закуп
        </DocumentButton>
        <DocumentButton>Формирование заявок на выплату</DocumentButton>
        <DocumentButton>Закрытие документов</DocumentButton>
      </Flex>
      <AddCunterpartyModal
        open={openCunterparty}
        onCancel={onCloseCunterparty}
      />
      <PurchaseRequestModal open={openRequest} onCancel={onCloseRequest} />
    </Wrapper>
  );
};
