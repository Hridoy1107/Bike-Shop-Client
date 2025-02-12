import { Layout, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hook";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;
  const location = useLocation();

  const getMenuItems = () => {
    return role === "admin"
      ? [
          {
            key: "/dashboard/admin/profile",
            icon: <SettingOutlined />,
            label: "My Profile",
            path: "admin/profile",
          },
          {
            key: "/dashboard/admin/manage-users",
            icon: <UserOutlined />,
            label: "Manage Users",
            path: "admin/manage-users",
          },
          {
            key: "/dashboard/admin/manage-products",
            icon: <AppstoreOutlined />,
            label: "Manage Products",
            path: "admin/manage-products",
          },
          {
            key: "/dashboard/admin/manage-orders",
            icon: <OrderedListOutlined />,
            label: "Manage Orders",
            path: "admin/manage-orders",
          },
        ]
      : [
          {
            key: "/dashboard/user/profile",
            icon: <SettingOutlined />,
            label: "My Profile",
            path: "user/profile",
          },
          {
            key: "/dashboard/user/my-orders",
            icon: <OrderedListOutlined />,
            label: "My Orders",
            path: "user/my-orders",
          },
        ];
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]} // Highlights the active menu item
        items={getMenuItems().map(({ key, icon, label, path }) => ({
          key,
          icon,
          label: <Link to={path}>{label}</Link>,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
