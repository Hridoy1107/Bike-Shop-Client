import { Row, Col } from "antd";
import AddBike from "./AddBike";
import AllBikes from "./AllBikes";

const ManageProducts = () => {
  return (
    <>
      <Row justify="center" style={{ padding: "20px" }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <AddBike></AddBike>
        </Col>
      </Row>
      <AllBikes></AllBikes>
    </>
  );
};

export default ManageProducts;
