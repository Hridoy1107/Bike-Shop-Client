import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

const CInput = ({ type, name, label, placeholder, disabled }: TInputProps) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Form.Item label={label} labelCol={{ style: { fontWeight: 600 } }}>
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default CInput;
