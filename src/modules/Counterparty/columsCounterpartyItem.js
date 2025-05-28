export const columsCounterpartyItem = [
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
    title: "Наименование компании",
    dataIndex: "company_name",
    key: "company_name",
    width: 100,
  },
  {
    title: "Юридический адрес",
    dataIndex: "legal_address",
    key: "legal_address",
    width: 150,
    //   render: (_, record) => record.data.contract_number,
  },
  {
    title: "Фактический адрес",
    dataIndex: "actual_address",
    key: "actual_address",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },

  {
    title: "Контактное лицо",
    dataIndex: "fio",
    key: "fio",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Статус проверки",
    dataIndex: "verification_status",
    key: "verification_status",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },
];
