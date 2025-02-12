import { useState } from "react";
import { Button, Row, Col, Card, Typography, Modal, Spin, Alert } from "antd";
import { FieldValues } from "react-hook-form";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  usePasswordChangeMutation,
  useGetUserByIdQuery,
} from "../../redux/features/auth/userApi";
import CForm from "../../components/forms/CForm";
import CInput from "../../components/forms/CInput";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Profile = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordChange] = usePasswordChangeMutation();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(currentUser?.userId);

  const retrievedData = user?.data;

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    const toastId = toast.loading("Changing password", { duration: 2000 });

    if (!currentUser?.userId) {
      toast.error("User ID is not available.", { id: toastId });
      return;
    }

    try {
      await passwordChange({ userId: currentUser.userId, ...data }).unwrap();
      toast.success("Password updated successfully!", { id: toastId });
      setIsModalOpen(false);
      reset();
    } catch (err) {
      type ServerError = {
        status: number;
        data: {
          message: string;
          success: boolean;
          errors?: { field: string; message: string }[];
        };
      };

      const error = err as ServerError;

      let errorMessage = "Something went wrong";
      if (error.data && error.data.message) {
        errorMessage = error.data.message;
      }

      if (error.data?.errors && error.data.errors.length > 0) {
        errorMessage = error.data.errors[0].message;
      }

      toast.error(errorMessage, { id: toastId, duration: 3000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ marginTop: 20, marginBottom: 20, height: "100%" }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card
          bordered={false}
          style={{ borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
            My Profile
          </Title>
          {isLoading ? (
            <Spin
              size="large"
              style={{
                display: "block",
                textAlign: "center",
                marginBottom: 20,
              }}
            />
          ) : isError ? (
            <Alert message="Failed to fetch user data" type="error" showIcon />
          ) : (
            <div style={{ marginBottom: 20 }}>
              <Row gutter={[16, 16]} style={{ textAlign: "left" }}>
                <Col span={24}>
                  <Text strong>Name: </Text>{" "}
                  <Text style={{ fontWeight: 600 }}>
                    {retrievedData?.userName || "N/A"}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong>Email: </Text>{" "}
                  <Text style={{ fontWeight: 600 }}>
                    {retrievedData?.email || "N/A"}
                  </Text>
                </Col>
                <Col span={24}>
                  <Text strong>Role: </Text>
                  <Text style={{ fontWeight: 600 }}>
                    {retrievedData?.role === "customer"
                      ? "Customer"
                      : retrievedData?.role === "admin"
                      ? "Admin"
                      : "N/A"}
                  </Text>
                </Col>
              </Row>
            </div>
          )}

          <Button
            style={{ marginTop: 15, fontWeight: 600 }}
            type="primary"
            block
            onClick={showModal}
          >
            Change Password
          </Button>
        </Card>

        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <CForm onSubmit={onSubmit}>
            <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
              Change Password
            </Title>
            <CInput
              type="password"
              name="oldPassword"
              label="Old Password"
              placeholder="Enter your old password"
            />
            <CInput
              type="password"
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
            />
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: 15, fontWeight: 600 }}
            >
              Done
            </Button>
            <Button
              type="primary"
              block
              danger
              onClick={handleCancel}
              style={{ marginTop: 10, fontWeight: 600 }}
            >
              Cancel
            </Button>
          </CForm>
        </Modal>
      </Col>
    </Row>
  );
};

export default Profile;
