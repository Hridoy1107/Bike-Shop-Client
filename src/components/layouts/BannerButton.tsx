import { Row, Col, Typography, Button } from "antd";
import Banner from "./Banner";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

const BannerButton = () => {
  return (
    <Row
      gutter={[16, 16]}
      align="middle"
      justify="center"
      style={{ padding: "16px", textAlign: "center" }}
    >
      <Col xs={24} md={24} lg={12}>
        <Banner />
      </Col>
      <Col
        xs={24}
        md={24}
        lg={12}
        style={{ textAlign: "center", padding: "16px" }}
      >
        <Title
          level={1}
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: "600",
            lineHeight: "1.2",
          }}
        >
          Find Your Dream Ride
        </Title>
        <Paragraph
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",

            margin: "16px 0",
            lineHeight: "1.5",
          }}
        >
          Discover the best bikes at unbeatable prices! Whether you’re a speed
          enthusiast, a casual rider, or an off-road explorer, we have the
          perfect ride for you. Shop now and hit the road in style!
        </Paragraph>
        <Link to="/all-products">
          <Button
            type="primary"
            size="large"
            style={{ fontWeight: 600, padding: "10px 20px" }}
          >
            Discover Now
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default BannerButton;
