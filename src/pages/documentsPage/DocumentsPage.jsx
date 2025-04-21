import { Button, Col, Flex, Form, Input, Modal, Select, Table } from "antd";
import {
  FilterOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FolderModal, RouteButton, Wrapper } from "../../common";
import { useDocumentsColums } from "./useDocumentsColums";
import styles from "./DocumentsPage.module.scss";
import { pages, pathname, status } from "../../enums";
import React, { useState } from "react";
import { employeeInfo } from "../../utils";
import { useSelector } from "react-redux";
import { useMessageColums } from "./useMessageColums";
import { documentsArr } from "../../data";
import foto from "../../assets/28.jpg";
import dayjs from "dayjs";
import { DocumentsTable } from "./DocumentsTable";
import { AddAgreementModal } from "../../components";
import {
  AgreementTable,
  CloseDocumentsTable,
  CounterpartyTable,
  PaymentRequestTable,
  PurchaseRequestTable,
} from "../../modules";
import { useLocation } from "react-router-dom";

const items = [
  { value: "1", label: status.APPROVED },
  { value: "2", label: status.REJECTED },
  { value: "3", label: status.IN_PROCESS },
  { value: "4", label: status.DRAFT },
  { value: "5", label: status.REVISION },
];

export const DocumemtsPage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const processName = searchParams.get("process_name");
  const documents = useSelector((state) => state.documents.documents);
  const [open, setOpen] = useState(false);
  // const { columns } = useDocumentsColums();
  const { columnsMessage } = useMessageColums();

  const [all, setAll] = useState(false);
  const data = documents?.filter(
    (item) => item?.employee?.email === employeeInfo()?.email
  );

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const employees = useSelector((state) => state.employees.employees);

  const matching = notifications?.filter((notif) =>
    employees?.some((emp) => emp.id === notif.member_id)
  );

  const message = matching?.filter(
    (item) => item.member_id === employeeInfo()?.id
  );

  const onClose = () => {
    setOpen(false);
  };

  const handleSetMessageFilter = (value) => {
    setAll(value);
  };

  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [openWorkWarning, setOpenWorkWarning] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const showApproveModal = (record) => {
    setSelectedDocument(record);
    setOpenApproveModal(true);
  };

  const showWorkWarning = () => {
    setOpenWorkWarning(true);
  };

  const handleApprove = (status) => {
    // Обработка выбора статуса
    console.log(`${selectedDocument?.data?.doc_name} утверждено как ${status}`);
    setOpenApproveModal(false);
  };

  const handleWorkWarningOk = () => {
    // Логика для отправки в работу
    console.log(
      `Документ ${selectedDocument?.data?.doc_name} отправлен в работу`
    );
    setOpenWorkWarning(false);
  };

  const handleWorkWarningCancel = () => {
    setOpenWorkWarning(false);
  };

  const columns = [
    {
      title: "№",
      dataIndex: "index",
      key: "index",
      align: "center",
      width: 20,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Инициатор",
      dataIndex: "data",
      key: "data",
      render: (_, record) => {
        return (
          <div className={styles.table_user_info}>
            <img src={foto} alt="product" className={styles.cart_img} />
            <div>
              <p>Testov Test</p>
              <p>testov@gmail.com</p>
            </div>
          </div>
        );
      },
      width: 100,
    },
    {
      title: "Название документа",
      dataIndex: "data",
      key: "data",
      width: 150,
      render: (_, record) => record.data.doc_name,
    },
    {
      title: "Контрагент",
      dataIndex: "contragent",
      key: "contragent",
      width: 150,
      render: (_, record) => record.data.contract_number,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 100,
      render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
    },
    {
      title: "Маршрут",
      dataIndex: "data",
      key: "data",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="chain_container">
          {record.record.map((step, index) => (
            <React.Fragment key={index}>
              <RouteButton statusFolder={step.status} item={record}>
                {step.step}
              </RouteButton>
              {index < record.record.length - 1 && <div className="line" />}
            </React.Fragment>
          ))}
        </div>
      ),
    },
    {
      title: "...",
      key: "record",
      align: "center",
      width: 50,
      render: (record) => (
        <>
          {record.data.doc_name === "Договор 004" ||
          record.data.doc_name === "Договор 005" ? (
            <Button
              type="primary"
              className={styles.btn}
              onClick={() => showApproveModal(record)}
            >
              Утвердить
            </Button>
          ) : (
            <Button
              type="primary"
              className={styles.btn}
              onClick={showWorkWarning}
            >
              В работу
            </Button>
          )}
        </>
      ),
    },
  ];
  console.log(message, data);

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
        {/* <Flex gap="small" justify="space-between">
          <Flex gap="small">
            <Input
              placeholder="Поиск по инициатору"
              prefix={<SearchOutlined />}
              style={{
                width: "200px",
              }}
            />
            <Select
              placeholder="Год"
              // options={items}
              style={{
                width: "80px",
              }}
            />
            <Select
              placeholder="Месяц"
              // options={items}
              style={{
                width: "100px",
              }}
            />
            <Select
              placeholder="Статус документа"
              // options={items}
              style={{
                width: "150px",
              }}
            />
            <Button>
              <FilterOutlined />
            </Button>
            <Button>
              <RedoOutlined />
            </Button>
          </Flex>
          <Button type="primary" onClick={() => setOpen(true)}>
            <PlusOutlined /> Добавить документ
          </Button>
        </Flex> */}
        {table}
      </Flex>
      <AddAgreementModal open={open} onCancel={() => setOpen(false)} />

      <Modal
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
      </Modal>
    </Wrapper>
  );
};
