import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../common";
import * as Pages from "../pages";
import { pathname } from "../enums";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: pathname.HOME, element: <Pages.HomePage /> },
      { path: pathname.DOCUMENTS, element: <Pages.DocumemtsPage /> },
      { path: pathname.EMPLOYEES, element: <Pages.EmployeesLayout /> },
      { path: pathname.EDIT_FOLDER, element: <Pages.EditFolderPage /> },
      { path: pathname.ADD_EMPLOYEE, element: <Pages.AddEmployeePage /> },
      { path: pathname.LOGIN, element: <Pages.LoginPage /> },
      { path: pathname.PROCESSES, element: <Pages.ProcessesPage /> },
      {
        path: pathname.CREATE_COUNTERPARTY,
        element: <Pages.AddCunterpartyPage />,
      },
      {
        path: pathname.CREATE_PURCHASE_REQUEST,
        element: <Pages.AddPurchaseRequestPage />,
      },
      {
        path: pathname.CREATE_AGREEMENT,
        element: <Pages.AddAgreementPage />,
      },
      {
        path: pathname.CREATE_PAYMENT_REQUEST,
        element: <Pages.AddPaymentRequestPage />,
      },
      {
        path: pathname.CLOSE_DOCUMENTS,
        element: <Pages.CloseDocumentsPage />,
      },
    ],
  },
]);
