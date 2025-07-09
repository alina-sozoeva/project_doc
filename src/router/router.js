import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../common";
import * as Pages from "../pages";
import { pathname } from "../enums";
import { PrivateRoute } from "./PraviteRoute";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: pathname.HOME, element: <Pages.HomePage /> },
      { path: pathname.DOCUMENTS, element: <Pages.DocumemtsPage /> },
      {
        path: pathname.EMPLOYEES,
        element: (
          <PrivateRoute>
            <Pages.EmployeesPage />
          </PrivateRoute>
        ),
      },
      { path: pathname.EDIT_FOLDER, element: <Pages.EditFolderPage /> },
      { path: pathname.LOGIN, element: <Pages.LoginPage /> },
      {
        path: pathname.PROCESSES,
        element: (
          <PrivateRoute>
            <Pages.ProcessesPage />
          </PrivateRoute>
        ),
      },
      {
        path: pathname.HISTORY,
        element: <Pages.HistoryPage />,
      },
      {
        path: pathname.FAVORITES,
        element: <Pages.FavoritesPage />,
      },
      {
        path: pathname.DOCUMENTITEM,
        element: <Pages.DocumentItemPage />,
      },
    ],
  },
]);
