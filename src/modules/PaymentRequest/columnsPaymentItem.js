import dayjs from "dayjs";

export const columnsPaymentItem = [
  {
    title: "№",
    dataIndex: "index",
    key: "index",
    align: "center",
    width: 30,
    render: (_text, _record, index) => index + 1,
  },
  {
    title: "Инициатор",
    dataIndex: "employee",
    key: "employee",
    width: 100,
    render: (_, record) => (
      <>
        <p>{record?.employee?.fio}</p>
        <p>{record?.employee?.email}</p>
      </>
    ),
  },
  {
    title: "Наименование заявки",
    dataIndex: "request_name",
    key: "request_name",
    width: 100,
  },
  {
    title: "Основание заявки",
    dataIndex: "request_basis",
    key: "request_basis",
    width: 150,
    //   render: (_, record) => record.data.contract_number,
  },
  {
    title: "Контрагент",
    dataIndex: "contragent",
    key: "contragent",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },

  {
    title: "Срок оплаты",
    dataIndex: "payment_date",
    key: "payment_date",
    width: 100,
    render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Статья бюджета",
    dataIndex: "budget",
    key: "budget",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Комментарии",
    dataIndex: "comments",
    key: "comments",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },
];
