import { Button, Form, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function FilterProject({ setQuery }) {
  interface FormType {
    name: string;
  }
  const { handleSubmit, control } = useForm<FormType>({});
  const onSubmit: SubmitHandler<FormType> = (data) => {
    let fields = [];
    for (const key in data) {
      const value = data[key as keyof FormType];
      if ((typeof value === "string" && value) || typeof value === "number") {
        fields.push(`${key}=${value}`);
      } else if (Array.isArray(value)) {
        fields.push(value.map((id) => `${key}=${id}`).join("&"));
      }
    }
    setQuery(fields.join("&"));
  };
  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      name="basic"
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Project Name" name="name">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Furniro"
              size="large"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="name"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
}
