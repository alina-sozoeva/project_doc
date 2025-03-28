import { Button, Flex, Input } from "antd";
import {
  AddAgreementModal,
  AddPaymentModal,
  CloseDocumentsModal,
  DocumentButton,
  Wrapper,
} from "../../common";
import { pages, pathname } from "../../enums";
import styles from "./AddDocumentPage.module.scss";
import { FolderAddOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AddCunterpartyModal, PurchaseRequestModal } from "../../components";

export const AddDocumentPage = () => {
  const [openCunterparty, setOpenCunterparty] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openAgreement, setOpenAgreement] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openCloseDocuments, setOpenCloseDocuments] = useState(false);

  const onCloseCunterparty = () => {
    setOpenCunterparty(false);
  };

  const onCloseRequest = () => {
    setOpenRequest(false);
  };

  const onCloseAgreement = () => {
    setOpenAgreement(false);
  };

  const onClosePayment = () => {
    setOpenPayment(false);
  };

  const onCloseCloseDocuments = () => {
    setOpenCloseDocuments(false);
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
        <DocumentButton onClick={() => setOpenAgreement(true)}>
          Согласование договора
        </DocumentButton>
        <DocumentButton onClick={() => setOpenRequest(true)}>
          Формирование заявок на закуп
        </DocumentButton>
        <DocumentButton onClick={() => setOpenPayment(true)}>
          Формирование заявок на выплату
        </DocumentButton>
        <DocumentButton onClick={() => setOpenCloseDocuments(true)}>
          Закрытие документов
        </DocumentButton>
      </Flex>
      <AddCunterpartyModal
        open={openCunterparty}
        onCancel={onCloseCunterparty}
      />
      <PurchaseRequestModal open={openRequest} onCancel={onCloseRequest} />
      <AddAgreementModal open={openAgreement} onCancel={onCloseAgreement} />
      <AddPaymentModal open={openPayment} onCancel={onClosePayment} />
      <CloseDocumentsModal
        open={openCloseDocuments}
        onCancel={onCloseCloseDocuments}
      />
    </Wrapper>
  );
};
