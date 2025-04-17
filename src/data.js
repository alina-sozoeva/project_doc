import foto from "../src/assets/28.jpg";
import { status } from "./enums";

export const dataSource = [
  {
    key: "2",
    guid: 21,
    user_foto: foto,
    user_name: "test1",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "Отклоненные",
    status: "Отказано",
  },
  {
    key: "3",
    guid: 22,
    user_foto: foto,
    user_name: "test2",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "В процессе",
    status: "На обработке",
  },
  {
    key: "4",
    guid: 22,
    user_foto: foto,
    user_name: "test3",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "Черновики",
    status: "Черновик",
  },
  {
    key: "5",
    guid: 24,
    user_foto: foto,
    user_name: "test4",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "На доработке",
    status: "Доработать",
  },
  {
    key: "6",
    guid: 25,
    user_foto: foto,
    user_name: "test5",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "Черновики",
    status: "Черновик",
  },
  {
    key: "7",
    guid: 26,
    user_foto: foto,
    user_name: "test6",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "Черновики",
    status: "Черновик",
  },
  {
    key: "8",
    guid: 27,
    user_foto: foto,
    user_name: "test7",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "Черновики",
    status: "Черновик",
  },
  {
    key: "9",
    guid: 27,
    user_foto: foto,
    user_name: "test8",
    title: "qwerty",
    date: "2025-01-01",
    folder_name: "Черновики",
    status: "Черновик",
  },
];

export const dataDocument = [
  {
    title: "Создание карточки контрагента1",
    route: "/create-counterparty",
    processName: "Создание карточки контрагента",
  },
  // {
  //   title: "Согласование договора1",
  //   route: "/agreement",
  //   processName: "Согласование договора",
  // },
  // {
  //   title: "Формирование заявок на закуп1",
  //   route: "/purchase-request",
  //   processName: "Формирование заявок на закуп",
  // },
  // {
  //   title: "Формирование заявок на выплату1",
  //   route: "/payment-request",
  //   processName: "Формирование заявок на выплату",
  // },
  // {
  //   title: "Закрытие документов1",
  //   route: "/close-documents",
  //   processName: "Закрытие документов",
  // },
  // {
  //   title: "Закрытие документов2",
  //   route: "/close-documents",
  //   processName: "Закрытие документов",
  // },
  // {
  //   title: "Формирование заявок на закуп2",
  //   route: "/purchase-request",
  //   processName: "Формирование заявок на закуп",
  // },
];

export const documentsArr = [
  {
    index: 1,
    data: {
      user_foto: "path/to/photo1.jpg",
      user_name: "Иван Иванов",
      doc_name: "Договор 001",
      contract_number: "test",
      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-01T10:00:00Z",
    folder_name: "Маршрут 1",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.REJECTED },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 2,
    data: {
      user_foto: "path/to/photo2.jpg",
      user_name: "Мария Петрова",
      doc_name: "Договор 002",
      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-02T12:30:00Z",
    folder_name: "Маршрут 2",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.REVISION },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 3,
    data: {
      user_foto: "path/to/photo3.jpg",
      user_name: "Алексей Смирнов",
      doc_name: "Договор 003",
      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-03T09:45:00Z",
    folder_name: "Маршрут 3",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.APPROVED },
      { step: 4, status: status.REJECTED },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 4,
    data: {
      user_foto: "path/to/photo4.jpg",
      user_name: "Ольга Кузнецова",
      doc_name: "Договор 004",
      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-04T14:00:00Z",
    folder_name: "Маршрут 4",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.IN_PROCESS },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 5,
    data: {
      user_foto: "path/to/photo5.jpg",
      user_name: "Дмитрий Сидоров",
      doc_name: "Договор 005",
      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-05T11:20:00Z",
    folder_name: "Маршрут 5",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.IN_PROCESS },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 6,
    data: {
      user_foto: "path/to/photo6.jpg",
      user_name: "Елена Попова",
      doc_name: "Договор 006",
      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-06T16:10:00Z",
    folder_name: "Маршрут 6",
    record: [
      { step: 1, status: status.REJECTED },
      { step: 2, status: status.PENDING },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 7,
    data: {
      user_foto: "path/to/photo7.jpg",
      user_name: "Сергей Васильев",
      doc_name: "Договор 007",
      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-07T09:00:00Z",
    folder_name: "Маршрут 7",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.APPROVED },
      { step: 3, status: status.IN_PROCESS },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 8,
    data: {
      user_foto: "path/to/photo8.jpg",
      user_name: "Анна Смирнова",
      doc_name: "Договор 008",

      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-08T10:40:00Z",
    folder_name: "Маршрут 8",
    record: [
      { step: 1, status: status.APPROVED },
      { step: 2, status: status.REJECTED },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 9,
    data: {
      user_foto: "path/to/photo9.jpg",
      user_name: "Кирилл Лебедев",
      doc_name: "Договор 009",
      contract_number: "test",

      title: "Создание карточки контрагента1", // Заменено
    },
    date: "2025-04-09T13:00:00Z",
    folder_name: "Маршрут 9",
    record: [
      { step: 1, status: status.IN_PROCESS },
      { step: 2, status: status.PENDING },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 10,
    data: {
      user_foto: "path/to/photo10.jpg",
      user_name: "Татьяна Михайлова",
      doc_name: "Договор 010",
      contract_number: "test",

      title: "Утверждение бюджета1", // Заменено
    },
    date: "2025-04-10T08:50:00Z",
    folder_name: "Маршрут 10",
    record: [
      { step: 1, status: status.PENDING },
      { step: 2, status: status.PENDING },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  {
    index: 11,
    data: {
      user_foto: "path/to/photo11.jpg",
      user_name: "Евгений Новиков",
      doc_name: "Договор 011",
      contract_number: "test",

      title: "Консультация по проекту1", // Заменено
    },
    date: "2025-04-11T07:30:00Z",
    folder_name: "Маршрут 11",
    record: [
      { step: 1, status: status.PENDING },
      { step: 2, status: status.PENDING },
      { step: 3, status: status.PENDING },
      { step: 4, status: status.PENDING },
      { step: 5, status: status.PENDING },
    ],
  },
  // {
  //   index: 12,
  //   data: {
  //     user_foto: "path/to/photo12.jpg",
  //     user_name: "Наталья Борисова",
  //     doc_name: "Договор 012",
  //     title: "Подготовка отчета1", // Заменено
  //   },
  //   date: "2025-04-12T15:00:00Z",
  //   folder_name: "Маршрут 12",
  //   record: [
  //     { step: 1, status: status.APPROVED },
  //     { step: 2, status: status.APPROVED },
  //     { step: 3, status: status.APPROVED },
  //     { step: 4, status: status.APPROVED },
  //     { step: 5, status: status.APPROVED },
  //   ],
  // },
];
