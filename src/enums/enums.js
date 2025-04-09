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
  LOGIN: "/login",
  REGISTER: "/register",
  PROCESSES: "/processes",
  CREATE_COUNTERPARTY: "/create-counterparty",
  CREATE_PURCHASE_REQUEST: "/purchase-request",
  CREATE_AGREEMENT: "/agreement",
  CREATE_PAYMENT_REQUEST: "/payment-request",
  CLOSE_DOCUMENTS: "/close-documents",
};

export const pages = {
  HOME: "Главная страница",
  DOCUMENTS: "Все документы",
  EMPLOYEES: "Структура организации",
  EDIT_FOLDER: "Редактировать файл",
  ADD_EMPLOYEE: "Добавить сотрудника",
  PROCESSES: "Справочник процессов",
  CREATE_COUNTERPARTY: "Создание карточки контрагента",
  CREATE_PURCHASE_REQUEST: "Формирование заявок на закуп",
  CREATE_AGREEMENT: "Формирование заявок на выплату",
  CREATE_PAYMENT_REQUEST: "Создание заявки на выплату",
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
  7: "Отдел продаж",
  8: "Отдел логистики",
  9: "Отдел качества",
  10: "CEO",
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
  9: "Маркетолог",
  10: "Копирайтер",
  11: "Оператор склада",
  12: "Водитель",
  13: "Сотрудник",
  14: "Начальник отдела",
  15: "Инженер",
  0: "Нет должности",
};

export const processesMap = {
  "/create-counterparty": "Создание карточки контрагента",
  "/agreement": "Согласование договора",
  "/purchase-request": "Формирование заявок на закуп",
  "/payment-request": "Формирование заявок на выплату",
  "/close-documents": "Закрытие документов",
};
