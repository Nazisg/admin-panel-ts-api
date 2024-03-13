import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Input, Modal, message } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActionModalProps } from "shared/types";
import { useResetEmployeeMutation } from "src/redux/api/employees";
import { resetEmployeeSchema } from "src/validation";

const ResetPassword: React.FC<ActionModalProps> = ({
  modalOpen,
  setModalOpen,
  selectedEmployeeId,
}) => {
  interface FormType {
    password: string;
    newConfirimPassword: string;
  }
  const [resetEmployee, { isSuccess }] = useResetEmployeeMutation();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(resetEmployeeSchema),
  });
  const onSubmit = (data: FormType) => {
    resetEmployee({ id: selectedEmployeeId, ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      setModalOpen(false);
      reset();
      message.success("Password reseted successfully");
    }
  }, []);

  return (
    <Modal
      title="Reset Password"
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={() => setModalOpen(false)}
      centered
    >
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Password" name="password">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.Password
                size="large"
                placeholder="********"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="password"
          />
        </Form.Item>
        {errors.password && (
          <span className="errorMsg">{errors.password.message}</span>
        )}
        <Form.Item label="Confirm Password" name="newConfirimPassword">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.Password
                size="large"
                placeholder="********"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="newConfirimPassword"
          />
        </Form.Item>
        {errors.password && (
          <span className="errorMsg">{errors.password.message}</span>
        )}
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ResetPassword;
