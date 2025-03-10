import { createBrowserRouter, Outlet } from "react-router-dom";
import { Header } from "../common";
import * as Pages from "../pages";

const Layout = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: "/", element: <Pages.HomePage /> }],
  },
]);
