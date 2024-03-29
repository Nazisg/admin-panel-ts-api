import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Form, Input, Modal } from "antd";
import { FunctionComponent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useChangePasswordMutation } from "src/redux/api/employees";
import { changePasswordEmployeeSchema } from "src/validation";

interface ChangePasswordProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
const ChangePassword: FunctionComponent<ChangePasswordProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  interface FormType {
    oldpassword: string;
    newPassword: string;
    newConfirmPassword: string;
  }
  const [changePassword, { isSuccess }] = useChangePasswordMutation();

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(changePasswordEmployeeSchema),
  });

  const onSubmit = () => {
    changePassword({
      oldpassword: getValues().oldpassword,
      newPassword: getValues().newPassword,
      newConfirmPassword: getValues().newConfirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
      reset();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={isModalOpen}
      title="Change Password"
      onOk={() => setIsModalOpen(false)}
      okButtonProps={{ style: { display: "none" } }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={() => setIsModalOpen(false)}
      centered
    >
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item label="Old Password" name="oldpassword">
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
            name="oldpassword"
          />
        </Form.Item>
        {errors.oldpassword && (
          <span className="errorMsg">{errors.oldpassword.message}</span>
        )}
        <Form.Item label="New Password" name="newPassword">
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
            name="newPassword"
          />
        </Form.Item>
        {errors.newPassword && (
          <span className="errorMsg">{errors.newPassword.message}</span>
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
            name="newConfirmPassword"
          />
        </Form.Item>
        {errors.newConfirmPassword && (
          <span className="errorMsg">{errors.newConfirmPassword.message}</span>
        )}
        <Flex justify="end">
          <Button type="primary" htmlType="submit">
            Change Password
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ChangePassword;
