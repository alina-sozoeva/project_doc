import { Layout } from "antd";
import { CustomSidebar } from "../CustomSidebar";
import { Header } from "../Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pathname } from "../../enums";
import { useEffect } from "react";

export const MainLayout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === pathname.LOGIN ||
    location.pathname === pathname.REGISTER;

  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      {!isAuthPage && (
        <Layout.Sider
          width={190}
          collapsible
          collapsedWidth={60}
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
            background: "white",
          }}
        >
          <CustomSidebar />
        </Layout.Sider>
      )}

      <Layout style={{ marginLeft: !isAuthPage ? 180 : 0 }}>
        {!isAuthPage && (
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
        )}

        <Layout.Content
          style={{ background: "white" }}
          className={!isAuthPage ? "basic" : ""}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
