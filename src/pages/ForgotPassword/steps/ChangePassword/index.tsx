import { Button, Form, Input, Typography } from "antd";
import styles from "./ChangePassword.module.scss";
import { useConfirmPasswordMutation } from "src/redux/api/otp";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmPasswordSchema } from "src/validation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ onNext }) => {
  const navigate = useNavigate();

  interface FormType {
    newPassword: string;
    confirmNewPassword: string;
  }
  const [confirmPassword, { isSuccess }] = useConfirmPasswordMutation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(confirmPasswordSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  const onSubmit = async (data: FormType) => {
    console.log(data.newPassword);
    console.log(data.confirmNewPassword);
    confirmPassword({
      newPassword: getValues().newPassword,
      confirmNewPassword: getValues().confirmNewPassword,
    });
    // confirmPassword(data)
  };
  return (
    <Typography className={styles.changePage}>
      <Form
        name="basic"
        onFinish={handleSubmit(onSubmit)}
        autoComplete="off"
        layout="vertical"
        className={styles.changeForm}
      >
        <Form.Item label="New Password" name="newPassword">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.Password
                placeholder="********"
                size="large"
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
        <Form.Item label="Confirm Password" name="confirmNewPassword">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.Password
                placeholder="********"
                size="large"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="confirmNewPassword"
          />
        </Form.Item>
        {errors.confirmNewPassword && (
          <span className="errorMsg">{errors.confirmNewPassword.message}</span>
        )}
        <Button type="primary" htmlType="submit" block size="large">
          Update Password
        </Button>
      </Form>
    </Typography>
  );
};

export default ChangePassword;
