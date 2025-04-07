export const departments = [
  { value: 1, label: "Юридический отдел" },
  { value: 2, label: "Служба безопасности" },
  { value: 3, label: "Финансовый отдел" },
  { value: 4, label: "Отдел закупок" },
  { value: 5, label: "Руководство компании" },
  { value: 6, label: "Отдел маркетинга" },
  { value: 7, label: "IT-отдел" },
  { value: 8, label: "Отдел кадров (HR)" },
  { value: 9, label: "Отдел продаж" },
  { value: 10, label: "Производственный отдел" },
  { value: 11, label: "Складской отдел" },
  { value: 12, label: "Отдел логистики" },
  { value: 13, label: "Отдел разработки" },
  { value: 14, label: "Отдел качества" },
  { value: 15, label: "Пресс-служба / PR-отдел" },
  { value: 16, label: "CEO" },
  { value: 0, label: "Нет отдела" },
];

export const positions = [
  { value: 1, label: "Все" },
  { value: 2, label: "Генеральный директор" },
  { value: 3, label: "Инициатор" },
  { value: 4, label: "Исполнитель" },
  { value: 5, label: "Юрист" },
  { value: 6, label: "Бухгалтер" },
  { value: 7, label: "Руководитель" },
  { value: 8, label: "Менеджер" },
  { value: 9, label: "HR-специалист" },
  { value: 10, label: "Программист" },
  { value: 11, label: "Тестировщик" },
  { value: 12, label: "Системный администратор" },
  { value: 13, label: "Маркетолог" },
  { value: 14, label: "Дизайнер" },
  { value: 15, label: "Контент-менеджер" },
  { value: 16, label: "Копирайтер" },
  { value: 17, label: "Оператор склада" },
  { value: 18, label: "Водитель" },
  { value: 19, label: "Сотрудник службы безопасности" },
  { value: 20, label: "Начальник отдела" },
  { value: 21, label: "Инженер" },
  { value: 22, label: "Технический директор (CTO)" },
  { value: 23, label: "Финансовый директор (CFO)" },
  { value: 0, label: "Нет должности" },
];

export const employees = [
  {
    id: "f7b3a6c9-7507-47c6-95ca-5138751553ea",
    fio: "Новович Новый",
    department: 8, // Отдел кадров (HR)
    position: 9, // HR-специалист
    email: "s@gmail.com",
    phone_number: "1233",
    photo: "/static/media/foto.2590299f7d1570f9461d.jpg",
    headId: 1, // Генеральный директор
  },
  {
    id: "d9b8a3bc-c5f4-4330-90a0-d7e7b6c7b3d7",
    fio: "Иванов Иван",
    department: 7, // IT-отдел
    position: 10, // Программист
    email: "ivanov@gmail.com",
    phone_number: "4567",
    photo: "/static/media/foto2.2590299f7d1570f9461d.jpg",
    headId: 1, // Генеральный директор
  },
  {
    id: "a4b1c3b9-e1b4-46c8-85b0-57d9b3a1a3b5",
    fio: "Смирнова Светлана",
    department: 9, // Отдел продаж
    position: 8, // Менеджер
    email: "smirnova@gmail.com",
    phone_number: "7890",
    photo: "/static/media/foto3.2590299f7d1570f9461d.jpg",
    headId: "f7b3a6c9-7507-47c6-95ca-5138751553ea", // Начальник отдела
  },
  {
    id: "e3a2a0b5-b2a5-4921-9e24-6f9d4bb2a6e9",
    fio: "Петрова Ольга",
    department: 3, // Финансовый отдел
    position: 6, // Бухгалтер
    email: "petrova@gmail.com",
    phone_number: "3214",
    photo: "/static/media/foto4.2590299f7d1570f9461d.jpg",
    headId: "f7b3a6c9-7507-47c6-95ca-5138751553ea", // Финансовый директор (CFO)
  },
  {
    id: "c3b0f0a8-5983-44bb-9908-576ecfa9e7c7",
    fio: "Кузнецов Алексей",
    department: 10, // Производственный отдел
    position: 19, // Сотрудник службы безопасности
    email: "kuznetsov@gmail.com",
    phone_number: "1122",
    photo: "/static/media/foto5.2590299f7d1570f9461d.jpg",
    headId: "e3a2a0b5-b2a5-4921-9e24-6f9d4bb2a6e9", // Сотрудник службы безопасности
  },
];
