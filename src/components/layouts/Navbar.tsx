import { MenuOutlined } from "@ant-design/icons";
import img from "../../assets/bike_icon.png";
import { Button, Dropdown, Layout, Typography, Space, Menu } from "antd";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { key: "1", label: "Home", to: "/" },
    { key: "2", label: "All Products", to: "/all-products" },
    { key: "3", label: "About", to: "/about" },
  ];

  const loggedInMenuItems = [
    { key: "4", label: "Dashboard", to: "/dashboard" },
    {
      key: "5",
      label: "Log Out",
      to: "/login",
      onClick: () => {
        dispatch(logout());
        toast.success("Logged out successfully!");
      },
      style: {
        backgroundColor: "#f5222d",
        borderColor: "#f5222d",
        color: "white",
      },
    },
  ];

  const authMenuItems = [
    { key: "5", label: "Log In", to: "/login" },
    { key: "6", label: "Register", to: "/register" },
  ];

  return (
    <Header style={{ background: "#f0f2f5", padding: "0 16px" }}>
      <Space
        style={{
          width: "100%",
          justifyContent: isMobile ? "space-between" : "space-between",
        }}
      >
        {isMobile && (
          <Dropdown
            overlay={
              <Menu>
                {menuItems.map((item) => (
                  <Menu.Item key={item.key} style={{ fontWeight: 600 }}>
                    {item.to ? (
                      <NavLink to={item.to}>
                        {({ isActive }) => (
                          <Button
                            type={isActive ? "default" : "primary"}
                            size="large"
                            style={{
                              width: "160px",
                              fontWeight: 600,
                              padding: "10px 20px",
                            }}
                          >
                            {item.label}
                          </Button>
                        )}
                      </NavLink>
                    ) : (
                      <Button
                        type={"primary"}
                        size="large"
                        style={{
                          width: "160px",
                          fontWeight: 600,
                          padding: "10px 20px",
                        }}
                      >
                        {item.label}
                      </Button>
                    )}
                  </Menu.Item>
                ))}
                {currentUser
                  ? loggedInMenuItems.map((item) => (
                      <Menu.Item key={item.key} onClick={item.onClick}>
                        {item.to ? (
                          <NavLink to={item.to}>
                            <Button
                              type="primary"
                              size="large"
                              style={{
                                width: "160px",
                                fontWeight: 600,
                                padding: "10px 20px",
                                ...item.style,
                              }}
                            >
                              {item.label}
                            </Button>
                          </NavLink>
                        ) : (
                          <Button
                            type="primary"
                            size="large"
                            style={{
                              width: "160px",
                              fontWeight: 600,
                              padding: "10px 20px",
                              ...item.style,
                            }}
                            onClick={item.onClick}
                          >
                            {item.label}
                          </Button>
                        )}
                      </Menu.Item>
                    ))
                  : authMenuItems.map((item) => (
                      <Menu.Item key={item.key}>
                        <NavLink to={item.to}>
                          <Button
                            type="primary"
                            size="large"
                            style={{
                              width: "160px",
                              fontWeight: 600,
                              padding: "10px 20px",
                            }}
                          >
                            {item.label}
                          </Button>
                        </NavLink>
                      </Menu.Item>
                    ))}
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="primary" icon={<MenuOutlined />} size="large" />
          </Dropdown>
        )}

        <Space>
          <img
            src={img}
            alt="Bike Shop"
            style={{ height: 40, verticalAlign: "middle" }}
          />
          <Title level={4} style={{ margin: 0 }}>
            Titan Bikes
          </Title>
        </Space>

        {!isMobile && (
          <>
            <Space>
              {menuItems.map((item) => (
                <NavLink key={item.key} to={item.to}>
                  {({ isActive }) => (
                    <Button
                      type={isActive ? "default" : "primary"}
                      size="large"
                      style={{ fontWeight: 600, padding: "10px 20px" }}
                    >
                      {item.label}
                    </Button>
                  )}
                </NavLink>
              ))}
            </Space>

            <Space>
              {currentUser
                ? loggedInMenuItems.map((item) => (
                    <NavLink key={item.key} to={item.to} onClick={item.onClick}>
                      {({ isActive }) => (
                        <Button
                          type={isActive ? "default" : "primary"}
                          size="large"
                          style={{
                            fontWeight: 600,
                            padding: "10px 20px",
                            ...item.style,
                          }}
                        >
                          {item.label}
                        </Button>
                      )}
                    </NavLink>
                  ))
                : authMenuItems.map((item) => (
                    <NavLink key={item.key} to={item.to}>
                      {({ isActive }) => (
                        <Button
                          type={isActive ? "default" : "primary"}
                          size="large"
                          style={{
                            fontWeight: 600,
                            padding: "10px 20px",
                          }}
                        >
                          {item.label}
                        </Button>
                      )}
                    </NavLink>
                  ))}
            </Space>
          </>
        )}
      </Space>
    </Header>
  );
};

export default Navbar;
