import { Carousel, Col, Row } from "antd";
import img1 from "../../assets/bike1.jpg";
import img2 from "../../assets/bike2.jpg";
import img3 from "../../assets/bike3.jpg";
import img4 from "../../assets/bike4.jpg";
import img5 from "../../assets/bike5.jpg";

const Banner = () => {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={18}>
        <Carousel autoplay>
          {[img1, img2, img3, img4, img5].map((img, index) => (
            <div key={index} style={{ width: "100%", textAlign: "center" }}>
              <img
                src={img}
                alt={`Bike ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "320px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default Banner;
