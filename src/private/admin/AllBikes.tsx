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
  Modal,
  Form,
  Input,
} from "antd";
import {
  useDeleteBikeMutation,
  useGetAllBikesQuery,
  useUpdateBikeMutation,
} from "../../redux/features/bike/bikeApi";
import { toast } from "sonner";
import CForm from "../../components/forms/CForm";
import CInput from "../../components/forms/CInput";
import CSelect from "../../components/forms/CSelect";
import { Controller, FieldValues } from "react-hook-form";

const { Title } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid;

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

const AllBikes = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterCategory, setFilterCategory] = useState<
    BikeCategory | undefined
  >(undefined);
  const [priceSortOrder, setPriceSortOrder] = useState<string | undefined>(
    undefined
  );
  const [deleteBike] = useDeleteBikeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [updateBike, { isLoading: isUpdating }] = useUpdateBikeMutation();

  const handleCancel = () => setIsModalOpen(false);

  const handleDelete = async (id: string) => {
    await deleteBike(id);
    refetch();
    toast.success("Bike deleted successfully!");
  };

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    if (!selectedBike) return;

    const formData = new FormData();
    formData.append("bikeName", values.bikeName);
    formData.append("brand", values.brand);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("quantity", values.quantity);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    await updateBike({ productId: selectedBike._id, formData });

    reset();
    refetch();

    toast.success("Bike updated successfully!");
    setIsModalOpen(false);
  };

  const defaultValues = selectedBike
    ? {
        bikeName: selectedBike?.bikeName,
        brand: selectedBike?.brand,
        price: selectedBike?.price,
        category: selectedBike?.category,
        description: selectedBike?.description,
        quantity: selectedBike?.quantity,
      }
    : {
        bikeName: "",
        brand: "",
        price: 0,
        category: BikeCategory.Cruiser,
        description: "",
        quantity: 0,
      };

  const screens = useBreakpoint();

  const bikesPerPage = screens.lg ? 8 : 6;
  const { data, isLoading, error, refetch } = useGetAllBikesQuery({
    category: filterCategory,
  });

  let bikes = data?.data || [];

  const showModal = (bike: Bike) => {
    setSelectedBike(bike);
    setIsModalOpen(true);
  };

  if (priceSortOrder === "Highest") {
    bikes = [...bikes].sort((a: Bike, b: Bike) => b.price - a.price);
  } else if (priceSortOrder === "Lowest") {
    bikes = [...bikes].sort((a: Bike, b: Bike) => a.price - b.price);
  }

  if (filterCategory) {
    bikes = bikes.filter((bike: Bike) => bike.category === filterCategory);
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
      <Title
        style={{ textAlign: "center", fontSize: "clamp(1.2rem, 5vw, 2rem)" }}
        level={2}
      >
        All Bikes
      </Title>

      <Row gutter={16} justify="center" style={{ marginBottom: 20 }}>
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
              <Button
                onClick={() => showModal(bike)}
                type="primary"
                block
                style={{ marginTop: 10, fontWeight: 600 }}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(bike._id)}
                danger
                type="primary"
                block
                style={{ marginTop: 10, fontWeight: 600 }}
              >
                Delete
              </Button>
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

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <CForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <CInput
            type="text"
            name="bikeName"
            label="Bike Name"
            placeholder="Enter bike name"
          />
          <CInput
            type="text"
            name="brand"
            label="Brand"
            placeholder="Enter brand name"
          />
          <CInput
            type="number"
            name="price"
            label="Price"
            placeholder="Enter price"
          />
          <CSelect
            name="category"
            label="Category"
            options={Object.values(BikeCategory).map((category) => ({
              value: category,
              label: category,
            }))}
          />
          <CInput
            type="textarea"
            name="description"
            label="Description"
            placeholder="Enter description"
          />
          <CInput
            type="number"
            name="quantity"
            label="Quantity"
            placeholder="Enter quantity"
          />
          <Controller
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <Form.Item
                label="Picture"
                labelCol={{ style: { fontWeight: 600 } }}
              >
                <Input
                  type="file"
                  value={value?.fileName}
                  {...field}
                  onChange={(e) => onChange(e.target.files?.[0])}
                />
              </Form.Item>
            )}
          />
          <Button
            style={{ fontWeight: 600 }}
            block
            type="primary"
            htmlType="submit"
            loading={isUpdating}
          >
            Update
          </Button>
          <Button
            block
            type="primary"
            danger
            onClick={handleCancel}
            style={{ marginTop: 10, fontWeight: 600 }}
          >
            Cancel
          </Button>
        </CForm>
      </Modal>
    </div>
  );
};

export default AllBikes;
