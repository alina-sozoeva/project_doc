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
  PROCESSES: "/add-processes",
  LOGIN: "/login",
  REGISTER: "/register",
  HISTORY: "/history",
  SEARCH: "/search",
  FAVORITES: "/favorites",
};

export const pages = {
  HOME: "Главная страница",
  DOCUMENTS: "Документы",
  EMPLOYEES: "Структура организации",
  EDIT_FOLDER: "Редактировать файл",
  ADD_EMPLOYEE: "Добавить сотрудника",
  PROCESSES: "Справочник процессов",
  HISTORY: "История действий",
  SEARCH: "Избранные документы",
  FAVORITES: "/favorites",
};

export const storageKeys = {
  NOTIFICATIONS: "notifications",
  EMPLOYEES: "employees",
  DOCUMENTS: "documents",
  PROCESSES: "processes",
  PROCESSES_MEMBERS: "processesMembers",
  USER: "user",
};

export const processesKeys = {
  CONTRAGENT: "contragent",
  SOGLOSOVANIE: "soglosovanie",
  ZAKUP: "zakup",
  VYPLATA: "vyplata",
  CLOSE: "close-documents",
};

export const processesMap = {
  contragent: "Создание карточки контрагента",
  soglosovanie: "Согласование договора",
  zakup: "Формирование заявок на закуп",
  vyplata: "Формирование заявок на выплату",
  "close-documents": "Закрытие документов",
};

export const departmentMap = {
  1: "Юридический отдел",
  2: "Служба безопасности",
  3: "Финансовый отдел",
  4: "Отдел закупок",
  5: "Отдел продаж",
  6: "Административный отдел",
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
  10: "Администратор",
};
