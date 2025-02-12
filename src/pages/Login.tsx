import { Button, Row, Col, Card, Typography } from "antd";
import { FieldValues } from "react-hook-form";
import CForm from "../components/forms/CForm";
import CInput from "../components/forms/CInput";
import { useLoginMutation } from "../redux/features/auth/userApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hook";
import { NavLink, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    const toastId = toast.loading("Logging in", { duration: 2000 });

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });

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
      style={{ marginTop: "20px", marginBottom: "20px", height: "100%" }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card
          bordered={false}
          style={{ borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: 20 }}>
            Login
          </Title>
          <CForm onSubmit={onSubmit}>
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
              Login
            </Button>
          </CForm>
          <Title level={5} style={{ textAlign: "center" }}>
            Not registered yet?
          </Title>
          <NavLink to="/register">
            <Button
              style={{ fontWeight: "bold" }}
              type="link"
              htmlType="submit"
              block
            >
              Register Now
            </Button>
          </NavLink>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
