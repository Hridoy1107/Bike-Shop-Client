import { Card, List, Pagination, Spin, Tag, Typography } from "antd";
import { useAppSelector } from "../redux/hook";
import { useGetOrdersByUserIdQuery } from "../redux/features/order/orderApi";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useState } from "react";

const { Title } = Typography;

interface Order {
  _id: string;
  email: string;
  productId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  status: string;
  transaction?: {
    id: string;
    transactionStatus?: string | null;
    bank_status?: string | null;
    sp_code?: string | null;
    sp_message?: string | null;
    method?: string | null;
    date_time?: string | null;
  };
  createdAt: string;
  updatedAt: string;
}

const MyOrders = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetOrdersByUserIdQuery(
    currentUser?.userId
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  const orders: Order[] = data?.data || [];

  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card
      title={
        <Title level={2} style={{ textAlign: "center" }}>
          My Orders
        </Title>
      }
    >
      {isLoading ? (
        <Spin
          size="large"
          style={{ display: "block", textAlign: "center", marginTop: 50 }}
        />
      ) : isError ? (
        <p style={{ color: "red", textAlign: "center" }}>
          Failed to load orders.
        </p>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={paginatedOrders}
            renderItem={(order) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      <b>Email:</b> {order.email}
                    </span>
                  }
                  description={
                    <>
                      <div>
                        <b>Product ID:</b> {order.productId}
                      </div>
                      <div>
                        <b>Quantity:</b> {order.quantity}
                      </div>
                      <div>
                        <b>Total Price:</b> ${order.totalPrice}
                      </div>
                      <div>
                        <b>Status:</b>{" "}
                        <Tag
                          color={order.status === "Paid" ? "green" : "volcano"}
                        >
                          {order.status}
                        </Tag>
                      </div>
                      <div>
                        <b>Transaction ID:</b> {order.transaction?.id || "N/A"}
                      </div>
                      <div>
                        <b>Bank Status:</b>{" "}
                        <Tag
                          color={
                            order.transaction?.bank_status === "Success"
                              ? "green"
                              : "default"
                          }
                        >
                          {order.transaction?.bank_status || "N/A"}
                        </Tag>
                      </div>
                      <div>
                        <b>Created At:</b>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={orders.length}
            onChange={setCurrentPage}
            style={{ marginTop: 16, textAlign: "center" }}
          />
        </>
      )}
    </Card>
  );
};

export default MyOrders;
