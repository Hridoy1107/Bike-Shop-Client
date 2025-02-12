import { Card, Col, Grid, Image, Row, Typography } from "antd";
import img1 from "../assets/bike8.jpg";

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const About = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs;
  const isSmallOrMediumScreen = screens.xs || screens.sm || screens.md;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <Title
        level={1}
        style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
        }}
      >
        Titan Bikes – "Where Passion Meets the Road"
      </Title>

      <Card style={{ marginBottom: "20px" }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={18} lg={24}>
            <Image
              src={img1}
              alt="Bike Shop"
              style={{
                width: isSmallOrMediumScreen ? "100%" : "850px",
                height: "auto",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          </Col>
        </Row>
        <Title
          level={2}
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
          }}
        >
          Our Story
        </Title>
        <Paragraph
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
          }}
        >
          At Titan Bikes, we’re more than just a bike shop; we’re a community of
          riders, adventurers, and enthusiasts who share a common love for the
          freedom that only a bike can bring. Founded in 2025, our mission is to
          provide cyclists of all levels with the finest selection of bicycles,
          accessories, and expert services. From the very first pedal to every
          milestone, we’re here to support your journey every step of the way.
        </Paragraph>
      </Card>

      <Card style={{ marginBottom: "20px" }}>
        <Title
          level={2}
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
          }}
        >
          Our Mission
        </Title>
        <Paragraph
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
          }}
        >
          Our mission is simple: to inspire and empower riders by offering
          high-quality bikes, excellent customer service, and expert advice. We
          want every rider—whether they’re a beginner or a seasoned pro—to
          experience the thrill of cycling with confidence, style, and
          performance.
        </Paragraph>
      </Card>

      <Card style={{ marginBottom: "20px" }}>
        <Title
          level={2}
          style={{
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
          }}
        >
          What Sets Us Apart?
        </Title>
        <ul
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
          }}
        >
          <li>
            <strong>Expert Knowledge & Passion:</strong> Our team is made up of
            cycling experts who are as passionate about bikes as you are.
          </li>
          <li>
            <strong>Wide Range of Products:</strong> We offer everything from
            road bikes, mountain bikes, and hybrid bikes to accessories like
            helmets, pedals, and custom gear.
          </li>
          <li>
            <strong>Customer-Centered Approach:</strong> At [Your Shop Name], we
            prioritize our customers and provide personalized solutions.
          </li>
          <li>
            <strong>Quality & Affordability:</strong> We offer top-tier products
            without breaking the bank.
          </li>
        </ul>
      </Card>

      <Card style={{ marginBottom: "20px" }}>
        <Title
          level={2}
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
          }}
        >
          Our Services
        </Title>
        <ul
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1rem, 3vw, 1.25rem)",
          }}
        >
          <li>
            <strong>Bike Sales:</strong> Explore a wide selection of bikes
            tailored to every type of rider.
          </li>
          <li>
            <strong>Repairs & Maintenance:</strong> Our expert technicians will
            keep your bike in prime condition.
          </li>
          <li>
            <strong>Custom Builds & Fittings:</strong> We specialize in custom
            builds and precise fittings.
          </li>
          <li>
            <strong>Bike Accessories & Gear:</strong> From helmets to locks, we
            carry a full range of bike accessories.
          </li>
        </ul>
      </Card>

      <Card style={{ marginBottom: "20px" }}>
        <Title
          level={2}
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1.25rem, 4vw, 2rem)", // Responsive title font size
          }}
        >
          Join the Ride
        </Title>
        <Paragraph
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1rem, 3vw, 1.25rem)", // Responsive paragraph font size
          }}
        >
          We’re more than just a store—we’re a family of riders! Join us for
          cycling events, community rides, and exclusive promotions. Whether
          you’re a weekend warrior or a daily commuter, we’re here to support
          your cycling journey.
        </Paragraph>
      </Card>

      <Card>
        <Title
          level={2}
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1.25rem, 4vw, 2rem)", // Responsive title font size
          }}
        >
          Get in Touch
        </Title>
        <Paragraph
          style={{
            textAlign: isSmallScreen ? "center" : "left",
            fontSize: "clamp(1rem, 3vw, 1.25rem)", // Responsive paragraph font size
          }}
        >
          Have questions or need recommendations? Our team is always here to
          help you make the best choice for your needs. Reach out to us at{" "}
          <strong>+1 (555) 987-6543</strong> or{" "}
          <strong>contact@titanbikes.com</strong>, or visit us at our location{" "}
          <strong>1234 Ride Street, Pedal City, CA 90210</strong>. We’d love to
          chat about bikes!
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;
