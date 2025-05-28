import dayjs from "dayjs";

export const columnsPurchaseItem = [
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
    title: "Название документа",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "Бюджетная статья",
    dataIndex: "budget",
    key: "budget",
    width: 150,
    render: (_, record) => (record.budget ? "Бюджет" : "Вне бюджета"),
  },
  {
    title: "Контрагент",
    dataIndex: "contragent",
    key: "contragent",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },

  {
    title: "Крайний срок проведения",
    dataIndex: "end_date",
    key: "end_date",
    width: 100,
    render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Комментарии",
    dataIndex: "comments",
    key: "comments",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },
];
