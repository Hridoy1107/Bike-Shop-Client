import { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Spin,
  Pagination,
  Row,
  Col,
  Empty,
  Select,
  Grid,
  Button,
  Input,
} from "antd";
import { useGetAllBikesQuery } from "../redux/features/bike/bikeApi";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;
const { Search } = Input;

enum BikeCategory {
  Cruiser = "Cruiser",
  Sportbike = "Sportbike",
  Adventure = "Adventure",
  Streetfighter = "Streetfighter",
}

interface Bike {
  _id: string;
  bikeName: string;
  brand: string;
  image?: string;
  price: number;
  category: BikeCategory;
  description: string;
  quantity: number;
}

const PublicAllBikes = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterCategory, setFilterCategory] = useState<
    BikeCategory | undefined
  >(undefined);
  const [priceSortOrder, setPriceSortOrder] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const screens = useBreakpoint();
  const bikesPerPage = screens.lg ? 8 : 6;

  const { data, isLoading, error } = useGetAllBikesQuery({
    category: filterCategory,
  });

  let bikes = data?.data || [];

  if (priceSortOrder === "Highest") {
    bikes = [...bikes].sort((a: Bike, b: Bike) => b.price - a.price);
  } else if (priceSortOrder === "Lowest") {
    bikes = [...bikes].sort((a: Bike, b: Bike) => a.price - b.price);
  }

  if (filterCategory) {
    bikes = bikes.filter((bike: Bike) => bike.category === filterCategory);
  }

  if (searchQuery) {
    bikes = bikes.filter(
      (bike: Bike) =>
        bike.bikeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const paginatedBikes = bikes.slice(
    (currentPage - 1) * bikesPerPage,
    currentPage * bikesPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{ display: "block", textAlign: "center", marginTop: 50 }}
      />
    );
  }

  if (error) {
    return <Empty description="Failed to load bikes" />;
  }

  return (
    <div>
      <Col style={{ textAlign: "center" }}>
        <Title
          level={1}
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            fontWeight: "600",
            lineHeight: "1.2",
          }}
        >
          Discover All
        </Title>
      </Col>

      <Row gutter={16} justify="center" style={{ marginBottom: 20 }}>
        <Col style={{ marginBottom: 16 }}>
          <Search
            placeholder="🔍 Search by bike name or brand"
            allowClear
            size="large"
            onSearch={handleSearch}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 220, borderRadius: "8px" }}
          />
        </Col>
        <Col style={{ marginBottom: 16 }}>
          <Select
            size="large"
            style={{
              width: 220,
              border: "2px solid #1890ff",
              borderRadius: "8px",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            placeholder="🔍 Filter by Category"
            onChange={(value) => setFilterCategory(value as BikeCategory)}
            allowClear
          >
            <Option value={BikeCategory.Cruiser}>🏍️ Cruiser</Option>
            <Option value={BikeCategory.Sportbike}>⚡ Sportbike</Option>
            <Option value={BikeCategory.Adventure}>🌍 Adventure</Option>
            <Option value={BikeCategory.Streetfighter}>🔥 Streetfighter</Option>
          </Select>
        </Col>
        <Col style={{ marginBottom: 16 }}>
          <Select
            size="large"
            style={{
              width: 220,
              border: "2px solid #fa8c16",
              borderRadius: "8px",
              padding: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            placeholder="💰 Sort by Price"
            onChange={(value) => setPriceSortOrder(value)}
            allowClear
          >
            <Option value="Lowest">⬇️ Lowest Price</Option>
            <Option value="Highest">⬆️ Highest Price</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {paginatedBikes.map((bike: Bike) => (
          <Col key={bike._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={bike.bikeName} src={bike.image} />}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Meta title={`${bike.bikeName}`} />
              <Card.Meta title={`Brand: ${bike.brand}`} />
              <Card.Meta title={`Category: ${bike.category}`} />
              <Card.Meta title={`Price: $${bike.price}`} />
              <Link to={`/details/${bike._id}`}>
                <Button
                  block
                  type="primary"
                  style={{ marginTop: 10, fontWeight: 600 }}
                >
                  Details
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={bikesPerPage}
        total={bikes.length}
        onChange={handlePageChange}
        style={{ marginTop: 20, textAlign: "center" }}
      />
    </div>
  );
};

export default PublicAllBikes;
