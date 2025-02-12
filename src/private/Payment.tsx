import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Spin,
  Result,
  Button,
  Card,
  Descriptions,
  Typography,
  Divider,
  Flex,
} from "antd";
import { useVerifyPaymentQuery } from "../redux/features/order/orderApi";

const { Title } = Typography;

const Payment = () => {
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
  const navigate = useNavigate();

  const { data, isLoading, error } = useVerifyPaymentQuery(order_id, {
    skip: !order_id,
  });

  if (!order_id) {
    return (
      <Result
        status="error"
        title="Invalid Request"
        subTitle="The order ID is missing. Please contact support."
        extra={[
          <Button type="primary" key="retry" onClick={() => navigate("/")}>
            Return to Home
          </Button>,
        ]}
      />
    );
  }

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", textAlign: "center", marginTop: 50 }}
      />
    );
  }

  if (error || !data) {
    return (
      <Result
        status="error"
        title="Payment Verification Failed"
        subTitle="We could not verify your payment. Please contact support."
        extra={[
          <Button type="primary" key="retry" onClick={() => navigate("/")}>
            Return to Home
          </Button>,
        ]}
      />
    );
  }

  const transaction = data?.data?.[0];
  const isPaymentSuccessful = transaction?.bank_status === "Success";

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "50px auto",
        padding: 20,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title
        level={3}
        style={{
          textAlign: "center",
          color: isPaymentSuccessful ? "green" : "red",
        }}
      >
        {isPaymentSuccessful ? "🎉 Payment Successful!" : "❌ Payment Failed"}
      </Title>
      <Divider />
      <Descriptions title="Transaction Details" column={1} bordered>
        <Descriptions.Item label="Order ID">
          {transaction?.order_id}
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          {transaction?.amount} BDT
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">
          {transaction?.method}
        </Descriptions.Item>
        <Descriptions.Item label="Bank Status">
          {transaction?.bank_status}
        </Descriptions.Item>
        <Descriptions.Item label="Transaction ID">
          {transaction?.bank_trx_id}
        </Descriptions.Item>
        <Descriptions.Item label="Date & Time">
          {transaction?.date_time}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Customer Details" column={1} bordered>
        <Descriptions.Item label="Name">
          {transaction?.name || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {transaction?.email || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {transaction?.phone_no || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {transaction?.address || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {transaction?.city || "N/A"}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Flex wrap="wrap" justify="center" gap={10}>
        <Button type="primary" onClick={() => navigate("/")}>
          Return to Home
        </Button>
        <Button onClick={() => navigate("/dashboard/user/my-orders")}>
          View Orders
        </Button>
      </Flex>
    </Card>
  );
};

export default Payment;
