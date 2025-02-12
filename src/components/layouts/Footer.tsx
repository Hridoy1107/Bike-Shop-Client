import { Layout, Row, Col, Typography, Space, Button } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        marginTop: 20,
        backgroundColor: "#001529",
        padding: "30px 50px",
      }}
    >
      <Row gutter={[16, 16]} justify="space-between">
        {/* About Us */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title
            level={4}
            style={{
              color: "#fff",
              fontSize: "clamp(1rem, 3vw, 1.5rem)", // Adjusted clamp for smaller medium screens
            }}
          >
            🚴‍♂️ About Us
          </Title>
          <Text style={{ color: "#fff" }}>
            "Your one-stop destination for high-quality bikes, expert repairs,
            and top-notch cycling accessories. Join our community and ride with
            confidence!"
          </Text>
          <Space direction="vertical" style={{ marginTop: "20px" }}>
            <Text style={{ color: "#fff" }}>
              📍 Location: 1234 Ride Street, Pedal City, CA 90210
            </Text>
            <Text style={{ color: "#fff" }}>📞 Call Us: +1 (555) 987-6543</Text>
            <Text style={{ color: "#fff" }}>
              📧 Email: support@titanbikes.com
            </Text>
          </Space>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title
            level={4}
            style={{
              color: "#fff",
              fontSize: "clamp(1rem, 3vw, 1.5rem)", // Adjusted clamp for smaller medium screens
            }}
          >
            🔗 Links
          </Title>
          <Space direction="vertical">
            <Button type="link" style={{ color: "#fff" }}>
              🏠 Home
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              🚴‍♂️ Shop Bikes
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              🔧 Services & Repairs
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              📖 Blog
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              📞 Contact Us
            </Button>
          </Space>
        </Col>

        {/* Customer Support */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title
            level={4}
            style={{
              color: "#fff",
              fontSize: "clamp(1rem, 3vw, 1.5rem)", // Adjusted clamp for smaller medium screens
            }}
          >
            🤝 Customer Care
          </Title>
          <Space direction="vertical">
            <Button type="link" style={{ color: "#fff" }}>
              📦 Shipping & Returns
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              💳 Payment & Financing
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              ❓ FAQs
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              📜 Terms & Conditions
            </Button>
            <Button type="link" style={{ color: "#fff" }}>
              🔒 Privacy Policy
            </Button>
          </Space>
        </Col>

        {/* Follow Us */}
        <Col xs={24} sm={12} md={6} lg={4}>
          <Title
            level={4}
            style={{
              color: "#fff",
              fontSize: "clamp(1rem, 3vw, 1.5rem)", // Adjusted clamp for smaller medium screens
            }}
          >
            📲 Follow Us
          </Title>
          <Space direction="vertical">
            <Button
              type="link"
              icon={<FacebookOutlined />}
              style={{ color: "#fff" }}
            >
              Facebook
            </Button>
            <Button
              type="link"
              icon={<InstagramOutlined />}
              style={{ color: "#fff" }}
            >
              Instagram
            </Button>
            <Button
              type="link"
              icon={<TwitterOutlined />}
              style={{ color: "#fff" }}
            >
              Twitter (X)
            </Button>
            <Button
              type="link"
              icon={<YoutubeOutlined />}
              style={{ color: "#fff" }}
            >
              YouTube
            </Button>
          </Space>
        </Col>
      </Row>

      {/* Newsletter Signup */}
      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col>
          <Title
            level={4}
            style={{
              color: "#fff",
              fontSize: "clamp(1rem, 3vw, 1.5rem)", // Adjusted clamp for smaller medium screens
            }}
          >
            📩 Newsletter Signup
          </Title>
          <Text style={{ color: "#fff" }}>
            Get the latest deals, discounts, and cycling tips delivered to your
            inbox!
          </Text>{" "}
          <Button type="primary" style={{ marginTop: "10px" }}>
            Subscribe Now
          </Button>
        </Col>
      </Row>

      {/* Copyright Notice */}
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col>
          <Text style={{ color: "#fff" }}>
            © 2025 Titan Bikes. All Rights Reserved.
          </Text>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
