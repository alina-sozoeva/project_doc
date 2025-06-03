import dayjs from "dayjs";

export const columnsAgreementItem = [
  {
    title: "№",
    dataIndex: "index",
    key: "guid",
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
        {/* <p>{record?.employee?.email}</p> */}
      </>
    ),
  },
  {
    title: "Номер договора",
    dataIndex: "contract_number",
    key: "contract_number",
    width: 100,
  },
  {
    title: "Дата создания",
    dataIndex: "creation_date",
    key: "creation_date",
    width: 150,
    render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Контрагент",
    dataIndex: "contragent",
    key: "contragent",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },

  {
    title: "Тип договора",
    dataIndex: "contract_type",
    key: "contract_type",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Срок действия",
    dataIndex: "validity_period",
    key: "validity_period",
    width: 100,
    render: (text) => dayjs(text).format("DD.MM.YYYY HH:mm"),
  },
  {
    title: "Статус согласования",
    dataIndex: "approval_status",
    key: "approval_status",
    width: 100,
    //   render: (_, record) => dayjs(record.date).format("DD.MM.YYYY HH:mm"),
  },
];
