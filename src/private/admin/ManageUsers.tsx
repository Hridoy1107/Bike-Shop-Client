import { useState, useEffect } from "react";
import {
  List,
  Card,
  Typography,
  Button,
  Spin,
  Select,
  Pagination,
  Row,
  Col,
} from "antd";
import {
  useGetUsersQuery,
  useBlockUserMutation,
} from "../../redux/features/auth/userApi";

const { Title } = Typography;
const { Option } = Select;

interface User {
  _id: string;
  userName: string;
  email: string;
  role: string;
  isBlocked: boolean;
}

const ManageUsers = () => {
  const [filterRole, setFilterRole] = useState<string>("");
  const [filterBlocked, setFilterBlocked] = useState<boolean | undefined>(
    undefined
  );
  const [currentPage, setCurrentPage] = useState<number>(
    Number(localStorage.getItem("currentPage")) || 1
  );
  const pageSize = 5;

  const { data, isLoading, refetch } = useGetUsersQuery({
    role: filterRole,
    isBlocked: filterBlocked,
  });
  const [blockUser] = useBlockUserMutation();

  const users = data?.data || [];

  const filteredUsers = users.filter((user: User) => {
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesBlocked =
      filterBlocked !== undefined ? user.isBlocked === filterBlocked : true;
    return matchesRole && matchesBlocked;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleBlock = async (userId: string) => {
    await blockUser({ userId }).unwrap();
    refetch();
  };

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  return (
    <Card
      title={
        <Title
          style={{ textAlign: "center", fontSize: "clamp(1.2rem, 5vw, 2rem)" }}
          level={2}
        >
          Manage Users
        </Title>
      }
    >
      <Row gutter={16} justify="center" style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
          <Select
            size="large"
            style={{
              width: "100%",
              border: "2px solid #1890ff",
              borderRadius: "8px",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            placeholder="🎭 Filter by Role"
            onChange={(value) => setFilterRole(value)}
            allowClear
          >
            <Option value="admin">👑 Admin</Option>
            <Option value="customer">🛒 Customer</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
          <Select
            size="large"
            style={{
              width: "100%",
              border: "2px solid #fa541c",
              borderRadius: "8px",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            placeholder="🚦 Filter by Blocked Status"
            onChange={(value) =>
              setFilterBlocked(
                value === "true" ? true : value === "false" ? false : undefined
              )
            }
            allowClear
          >
            <Option value="true">⛔ Blocked</Option>
            <Option value="false">✅ Active</Option>
          </Select>
        </Col>
      </Row>

      {isLoading ? (
        <Spin
          size="large"
          style={{ display: "block", textAlign: "center", marginTop: 50 }}
        />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={paginatedUsers}
            renderItem={(user: User) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    danger
                    style={{ fontWeight: 600, width: "100%" }}
                    disabled={user.isBlocked}
                    onClick={() => handleBlock(user._id)}
                  >
                    {user.isBlocked ? "Blocked" : "Block"}
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <>
                      <div style={{ fontWeight: 600 }}>
                        Name: {user.userName}
                      </div>
                      <div style={{ marginTop: 2, fontWeight: 500 }}>
                        Role:{" "}
                        {user?.role === "customer"
                          ? "Customer"
                          : user?.role === "admin"
                          ? "Admin"
                          : "N/A"}
                      </div>
                    </>
                  }
                  description={
                    <>
                      <div style={{ fontWeight: 600 }}>Email: {user.email}</div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredUsers.length}
            onChange={setCurrentPage}
            style={{ marginTop: 16, textAlign: "center", width: " 100%" }}
          />
        </>
      )}
    </Card>
  );
};

export default ManageUsers;
