import { Link, useParams } from "react-router-dom";
import { useGetBikeByIdQuery } from "../redux/features/bike/bikeApi";
import { Card, Typography, Spin, Empty, Button } from "antd";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hook";

const { Title, Paragraph } = Typography;

const BikeDetails = () => {
  const { bikeId } = useParams();
  const { data, isLoading, error } = useGetBikeByIdQuery(bikeId);

  const user = useAppSelector(selectCurrentUser);

  if (isLoading)
    return (
      <Spin
        size="large"
        style={{ display: "block", textAlign: "center", marginTop: 50 }}
      />
    );
  if (error || !data) return <Empty description="Bike details not found" />;

  const {
    _id,
    bikeName,
    brand,
    image,
    price,
    category,
    description,
    quantity,
  } = data.data;

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "20px auto",
        textAlign: "center",
        padding: 20,
      }}
      cover={<img alt={bikeName} src={image} />}
    >
      <Title level={2}>{bikeName}</Title>
      <Paragraph strong>
        Brand: <strong>{brand}</strong>
      </Paragraph>
      <Paragraph strong>
        Category: <strong>{category}</strong>
      </Paragraph>
      <Paragraph strong>
        Price: <strong>${price}</strong>
      </Paragraph>
      <Paragraph strong>{description}</Paragraph>
      <Paragraph strong>
        Stock:{" "}
        <strong>
          {quantity > 0 ? `${quantity} available` : "Out of stock"}
        </strong>
      </Paragraph>
      <Link to={`/checkout/${_id}`}>
        <Button
          disabled={quantity <= 0 || user?.role === "admin"}
          block
          type="primary"
          style={{ marginTop: 10, fontWeight: 600 }}
        >
          Buy Now
        </Button>
      </Link>
    </Card>
  );
};

export default BikeDetails;
