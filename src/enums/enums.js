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
  PROCESSES: "/processes",
  CREATE_COUNTERPARTY: "/create-counterparty",
  CREATE_PURCHASE_REQUEST: "/purchase-request",
  CREATE_AGREEMENT: "/agreement",
  CREATE_PAYMENT_REQUEST: "/payment-request",
  CLOSE_DOCUMENTS: "/close-documents",
  LOGIN: "/login",
  REGISTER: "/register",
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

export const storageKeys = {
  NOTIFICATIONS: "notifications",
  EMPLOYEES: "employees",
  DOCUMENTS: "documents",
  PROCESSES: "processes",
  PROCESSES_MEMBERS: "processesMembers",
};

export const processesMap = {
  "/create-counterparty": "Создание карточки контрагента",
  "/agreement": "Согласование договора",
  "/purchase-request": "Формирование заявок на закуп",
  "/payment-request": "Формирование заявок на выплату",
  "/close-documents": "Закрытие документов",
};

export const departmentMap = {
  1: "Юридический отдел",
  2: "Служба безопасности",
  3: "Финансовый отдел",
  4: "Отдел закупок",
  5: "Отдел продаж",
};

export const positionMap = {
  1: "Исполнитель",
  2: "Юрист",
  3: "Бухгалтер",
  4: "Руководитель",
  5: "Менеджер",
  6: "Сотрудник",
  7: "Начальник",
  8: "Исполнительный директор",
  9: "Генеральный директор",
};
