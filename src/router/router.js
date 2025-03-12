import { createBrowserRouter, Outlet } from "react-router-dom";
import { CustomSidebar, Header } from "../common";
import * as Pages from "../pages";
import { Layout } from "antd";

const CustomLayout = () => (
  <Layout style={{ minHeight: "100vh", background: "white" }}>
    <Layout.Sider
      width={190}
      collapsible
      // collapsed={collapsed}
      collapsedWidth={60}
      // onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      theme="light"
      style={{
        position: "fixed",
        top: 0,
        width: 60,
        maxWidth: 60,
        bottom: 0,
        zIndex: 401,
        overflow: "auto",
      }}
    >
      <CustomSidebar />
    </Layout.Sider>
    <Layout style={{ marginLeft: 180 }}>
      <Layout.Header
        style={{
          padding: 0,
          position: "sticky",
          top: 0,
          zIndex: 400,
          width: "100%",
          lineHeight: "1",
          height: 68,
          display: "flex",
          alignItems: "center",
          background: "white",
        }}
      >
        <Header />
      </Layout.Header>
      <Layout.Content style={{ background: "white" }} className="basic">
        <Outlet />
      </Layout.Content>
    </Layout>
  </Layout>
);

export const router = createBrowserRouter([
  {
    element: <CustomLayout />,
    children: [
      { path: "/", element: <Pages.HomePage /> },
      { path: "/employees", element: <Pages.EmployeesPage /> },
    ],
  },
]);
