import { Button, Row, Col, Card, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import CForm from "../components/forms/CForm";
import CInput from "../components/forms/CInput";
import { useAppDispatch } from "../redux/hook";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/features/auth/userApi";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";

const { Title } = Typography;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    const toastId = toast.loading("Registering", { duration: 2000 });

    try {
      const userInfo = {
        userName: data.userName,
        email: data.email,
        password: data.password,
      };

      const res = await register(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Registered Successfully", { id: toastId, duration: 2000 });

      reset();

      if (user.role === "admin") {
        navigate("/dashboard/admin/profile");
      } else {
        navigate("/dashboard/user/profile");
      }
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

      if (error.data?.errors?.length) {
        error.data.errors.forEach((e, index) => {
          setTimeout(() => {
            toast.error(`${e.message}`, {
              id: toastId,
              duration: 3000,
            });
          }, index * 1000);
        });
      } else if (error.data?.message) {
        toast.error(error.data.message, { id: toastId, duration: 3000 });
      }
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ marginTop: "20px", marginBottom: "20px", height: "100%" }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 10,
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
            Register
          </Title>
          <CForm onSubmit={onSubmit}>
            <CInput
              type="text"
              name="userName"
              label="Name"
              placeholder="Enter your name"
            />
            <CInput
              type="text"
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            <CInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: 15 }}
            >
              Register
            </Button>
          </CForm>
          <Title level={5} style={{ textAlign: "center" }}>
            Have account?
          </Title>
          <NavLink to="/login">
            <Button
              style={{ fontWeight: "bold" }}
              type="link"
              htmlType="submit"
              block
            >
              Login Now
            </Button>
          </NavLink>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
