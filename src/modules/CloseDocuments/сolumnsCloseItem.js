import dayjs from "dayjs";

export const сolumnsCloseItem = [
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
    title: "Наименование процесса",
    dataIndex: "name",
    key: "name",
    width: 100,
  },
  {
    title: "Основание (договор/документ)",
    dataIndex: "basis_document",
    key: "basis_document",
    width: 150,
    //   render: (_, record) => record.data.contract_number,
  },
  {
    title: "Дата закрытия",
    dataIndex: "close_date",
    key: "close_date",
    width: 100,
    render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
  },

  {
    title: "Статус закрытия",
    dataIndex: "close_status",
    key: "close_status",
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
