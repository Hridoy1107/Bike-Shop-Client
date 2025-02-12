import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TCSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
};

const CSelect = ({ label, name, options, disabled, mode }: TCSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} labelCol={{ style: { fontWeight: 600 } }}>
          <Select
            mode={mode}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default CSelect;
