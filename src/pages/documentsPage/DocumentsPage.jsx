import { Flex } from "antd";
import { Wrapper } from "../../common";
import styles from "./DocumentsPage.module.scss";
import { pathname, processesKeys } from "../../enums";
import {
  AgreementTable,
  AllDocs,
  CloseDocumentsTable,
  CounterpartyTable,
  PaymentRequestTable,
  PurchaseRequestTable,
  UnreadDocs,
} from "../../modules";
import { useLocation } from "react-router-dom";

export const DocumemtsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const processName = searchParams.get("process_name");

  const getTableComponent = (processName) => {
    switch (processName) {
      case processesKeys.CONTRAGENT:
        return <CounterpartyTable />;

      case processesKeys.SOGLOSOVANIE:
        return <AgreementTable />;

      case processesKeys.ZAKUP:
        return <PurchaseRequestTable />;

      case processesKeys.VYPLATA:
        return <PaymentRequestTable />;

      case processesKeys.CLOSE:
        return <CloseDocumentsTable />;

      case processesKeys.ALL:
        return <AllDocs />;

      case processesKeys.UNREAD:
        return <UnreadDocs />;

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
      path={`${pathname.DOCUMENTS}?process_name=${processName}`}
      title={processName}
      page={true}
    >
      <Flex vertical gap="small">
        {table}
      </Flex>
    </Wrapper>
  );
};
