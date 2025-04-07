export const status = {
  APPROVED: "Утверждено",
  REJECTED: "Отказано",
  IN_PROCESS: "На обработке",
  DRAFT: "Черновик",
  REVISION: "Доработать",
};

export const pathname = {
  HOME: "/",
  DOCUMENTS: "/documents",
  EMPLOYEES: "/employees",
  EDIT_FOLDER: "/edit-folder/:id/:status",
  ADD_EMPLOYEE: "/add-employee",
  ADD_DOCUMENT: "/add-document",
  LOGIN: "/login",
  REGISTER: "/register",
  PROCESSES: "/processes",
  CREATE_COUNTERPARTY: "/create-counterparty",
  CREATE_PURCHASE_REQUEST: "/purchase-request",
  CREATE_AGREEMENT: "/agreement",
  CREATE_PAYMENT_REQUEST: "/payment-request",
  CLOSE_DOCUMENTS: "CLOSE_DOCUMENTS",
};

export const pages = {
  HOME: "Главная страница",
  DOCUMENTS: "Все документы",
  EMPLOYEES: "Структура организации",
  EDIT_FOLDER: "Редактировать файл",
  ADD_EMPLOYEE: "Добавить сотрудника",
  ADD_DOCUMENT: "Добавить документ",
  PROCESSES: "Справочник процессов",
  CREATE_COUNTERPARTY: "Создание карточки контрагента",
  CREATE_PURCHASE_REQUEST: "Формирование заявок на закуп",
  CREATE_AGREEMENT: "Формирование заявок на выплату",
  CREATE_PAYMENT_REQUEST: "Формирование заявок на выплату",
  CLOSE_DOCUMENTS: "Закрытие документов",
};

export const employee = {
  DEPARTMENT: "Отдел",
  EMPLOYEE: "Сотрудник",
};

export const department = {
  LEGAL: "Юридический отдел",
  SECURITY: "Служба безопасности",
  FINANCE: "Финансовый отдел",
  PROCUREMENT: "Отдел закупок",
  MANAGEMENT: "Руководство компании",
};

export const position = {
  ALL: "Все",
  CEO: "Генеральный директор",
  INITIATOR: "Инициатор",
  EXECUTOR: "Исполнитель",
  SECURITY_EMPLOYEE: "Сотрудник",
  ACCOUNTANT: "Бухгалтер",
  HEAD_OF_FINANCE: "Руководитель",
  MANAGER: "Менеджер",
  LAWYER: "Юрист",
};

export const departmentMap = {
  1: "Юридический отдел",
  2: "Служба безопасности",
  3: "Финансовый отдел",
  4: "Отдел закупок",
  5: "Руководство компании",
  6: "Отдел маркетинга",
  7: "IT-отдел",
  8: "Отдел кадров (HR)",
  9: "Отдел продаж",
  10: "Производственный отдел",
  11: "Складской отдел",
  12: "Отдел логистики",
  13: "Отдел разработки",
  14: "Отдел качества",
  15: "Пресс-служба / PR-отдел",
  16: "CEO",
  0: "Нет отдела",
};

export const positionMap = {
  1: "Все",
  2: "Генеральный директор",
  3: "Инициатор",
  4: "Исполнитель",
  5: "Юрист",
  6: "Бухгалтер",
  7: "Руководитель",
  8: "Менеджер",
  9: "HR-специалист",
  10: "Программист",
  11: "Тестировщик",
  12: "Системный администратор",
  13: "Маркетолог",
  14: "Дизайнер",
  15: "Контент-менеджер",
  16: "Копирайтер",
  17: "Оператор склада",
  18: "Водитель",
  19: "Сотрудник службы безопасности",
  20: "Начальник отдела",
  21: "Инженер",
  22: "Технический директор (CTO)",
  23: "Финансовый директор (CFO)",
  0: "Нет должности",
};

export const processesMap = {
  "/create-counterparty": "Создание карточки контрагента",
  "/agreement": "Согласование договора",
  "/purchase-request": "Формирование заявок на закуп",
  "/payment-request": "Формирование заявок на выплату",
  "/close-documents": "Закрытие документов",
};
