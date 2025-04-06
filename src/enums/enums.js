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
};

export const pages = {
  HOME: "Главная страница",
  DOCUMENTS: "Все документы",
  EMPLOYEES: "Структура организации",
  EDIT_FOLDER: "Редактировать файл",
  ADD_EMPLOYEE: "Добавить сотрудника",
  ADD_DOCUMENT: "Добавить документ",
  PROCESSES: "Справочник процессов",
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
