import { useState } from "react";
import { Button, Modal, Card, Typography, Form, Input } from "antd";
import { Controller, FieldValues } from "react-hook-form";
import { useCreateBikeMutation } from "../../redux/features/bike/bikeApi";
import CForm from "../../components/forms/CForm";
import CInput from "../../components/forms/CInput";
import CSelect from "../../components/forms/CSelect";
import { toast } from "sonner";

const { Title } = Typography;

const AddBike = () => {
  enum BikeCategory {
    Cruiser = "Cruiser",
    Sportbike = "Sportbike",
    Adventure = "Adventure",
    Streetfighter = "Streetfighter",
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createBike, { isLoading }] = useCreateBikeMutation();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const onSubmit = async (values: FieldValues, reset: () => void) => {
    const toastId = toast.loading("Uploading data", { duration: 2000 });

    try {
      const formData = new FormData();

      formData.append("bikeName", values.bikeName);
      formData.append("brand", values.brand);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("quantity", values.quantity);

      formData.append("image", values.image);

      await createBike(formData).unwrap();

      toast.success("Uploaded successfully!", { id: toastId, duration: 2000 });
      reset();

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      const error = err as {
        data?: { message?: string; errors?: { message: string }[] };
      };
      let errorMessage = "Something went wrong";

      if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (error.data?.errors?.length) {
        errorMessage = error.data.errors[0].message;
      }

      toast.error(errorMessage, { id: toastId, duration: 3000 });
    }
  };
  return (
    <>
      <Card
        title={
          <Title
            level={2}
            style={{
              textAlign: "center",
              fontSize: "clamp(1rem, 5vw, 2rem)",
            }}
          >
            Manage Products
          </Title>
        }
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Button
            style={{
              fontWeight: 600,
              fontSize: "clamp(.8rem, 4vw, 1.2rem)",
            }}
            block
            type="primary"
            size="large"
            onClick={showModal}
          >
            Add Bike to DB
          </Button>
        </div>
        <Modal
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          centered
        >
          <CForm onSubmit={onSubmit}>
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
              loading={isLoading}
            >
              Submit
            </Button>
            <Button
              block
              danger
              type="primary"
              onClick={handleCancel}
              style={{ marginTop: 10, fontWeight: 600 }}
            >
              Cancel
            </Button>
          </CForm>
        </Modal>
      </Card>
    </>
  );
};

export default AddBike;
