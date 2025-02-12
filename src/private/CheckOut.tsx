import { Button, Card, Col, Empty, Row, Spin, Typography } from "antd";
import CForm from "../components/forms/CForm";
import CInput from "../components/forms/CInput";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBikeByIdQuery } from "../redux/features/bike/bikeApi";
import { useAppSelector } from "../redux/hook";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useGetUserByIdQuery } from "../redux/features/auth/userApi";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const { Paragraph } = Typography;

const CheckOut = () => {
  const { bikeId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetBikeByIdQuery(bikeId);

  const currentUser = useAppSelector(selectCurrentUser);
  const { data: user } = useGetUserByIdQuery(currentUser?.userId);
  const retrievedData = user?.data;

  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  if (isLoading)
    return (
      <Spin
        size="large"
        style={{ display: "block", textAlign: "center", marginTop: 50 }}
      />
    );
  if (error || !data) return <Empty description="Bike details not found" />;

  const { bikeName, brand, price, quantity } = data.data;

  const onSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Redirecting to payment", { duration: 2000 });

    if (!retrievedData?._id || !retrievedData?.email) {
      toast.error("User is not available.", { id: toastId });
      return;
    }

    const orderData = {
      userId: retrievedData._id,
      userName: retrievedData.userName,
      email: retrievedData.email,
      productId: bikeId,
      quantity: Number(values.quantity),
      totalPrice: Number(values.quantity) * price,
    };

    try {
      const response = await createOrder(orderData).unwrap();
      if (response) {
        toast.success("Redirecting to payment");

        window.location.href = response.data;
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
      console.log(error);

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
        <Card>
          <Paragraph strong>
            Bike Name: <strong>{bikeName}</strong>
          </Paragraph>
          <Paragraph strong>
            Brand: <strong>{brand}</strong>
          </Paragraph>
          <Paragraph strong>
            Price: <strong>${price}</strong>
          </Paragraph>
          <CForm onSubmit={onSubmit}>
            <CInput
              type="number"
              name="quantity"
              label={`Quantity (Max: ${quantity})`}
              placeholder="Enter quantity"
            />

            <Button
              style={{ fontWeight: 600 }}
              block
              type="primary"
              htmlType="submit"
              loading={orderLoading}
            >
              Order & Pay
            </Button>
            <Button
              block
              danger
              type="primary"
              style={{ marginTop: 10, fontWeight: 600 }}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </CForm>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckOut;
