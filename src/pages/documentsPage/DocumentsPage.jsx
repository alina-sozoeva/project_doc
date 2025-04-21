import { Flex } from "antd";
import { Wrapper } from "../../common";
import styles from "./DocumentsPage.module.scss";
import { pages, pathname } from "../../enums";
import React from "react";
import {
  AgreementTable,
  CloseDocumentsTable,
  CounterpartyTable,
  PaymentRequestTable,
  PurchaseRequestTable,
} from "../../modules";
import { useLocation } from "react-router-dom";

export const DocumemtsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const processName = searchParams.get("process_name");

  const getTableComponent = (processName) => {
    switch (processName) {
      case "contragent":
        return <CounterpartyTable />;

      case "soglosovanie":
        return <AgreementTable />;

      case "zakup":
        return <PurchaseRequestTable />;

      case "vyplata":
        return <PaymentRequestTable />;

      case "close":
        return <CloseDocumentsTable />;

      default:
        return (
          <>
            <div>Нет данных</div>
          </>
        );
    }
  };

  const table = getTableComponent(processName);

  return (
    <Wrapper
      className={styles.content}
      path={pathname.DOCUMENTS}
      title={pages.DOCUMENTS}
      page={true}
    >
      <Flex vertical gap="small">
        {table}
      </Flex>

      {/* <Modal
        centered
        width={400}
        open={openApproveModal}
        title={`Утверждение документа`}
        onCancel={() => setOpenApproveModal(false)}
        footer={null}
      >
        <Flex vertical>
          <p>
            <strong>Название документа:</strong>{" "}
            {selectedDocument?.data?.doc_name}
          </p>
          <p>
            <strong>Номер документа:</strong> 111
          </p>
          <p>
            <strong>Дата создания:</strong>{" "}
            {dayjs(selectedDocument?.date).format("DD.MM.YYYY HH:mm")}
          </p>
          <p>
            <strong>Автор:</strong> {selectedDocument?.data?.user_name}
          </p>
          <p>
            <strong>Описание:</strong>{" "}
            {selectedDocument?.data?.contract_number || "Нет описания"}
          </p>
        </Flex>
        <Flex align="center" justify="center" gap={"small"}>
          <Button type="primary" onClick={() => handleApprove("Согласовать")}>
            Согласовать
          </Button>
          <Button danger onClick={() => handleApprove("Отказать")}>
            Отказать
          </Button>
          <Button type="default" onClick={() => handleApprove("Доработать")}>
            Доработать
          </Button>
        </Flex>
      </Modal> */}
    </Wrapper>
  );
};
