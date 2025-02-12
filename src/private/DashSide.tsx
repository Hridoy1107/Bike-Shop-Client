import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const { Content } = Layout;

const DashSide = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar></Sidebar>
      <Layout>
        <Content style={{ margin: "24px 16px 0", background: "#fff" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashSide;
