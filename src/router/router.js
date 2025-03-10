import { createBrowserRouter, Outlet } from "react-router-dom";
import { Header } from "../common";
import * as Pages from "../pages";

const Layout = () => (
  <div className="layout">
    <Header />
    <div className="outlet">
      <Outlet />
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: "/", element: <Pages.HomePage /> }],
  },
]);
