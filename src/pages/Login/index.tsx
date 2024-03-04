import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Typography, message } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginMutation } from "src/redux/api/auth";
import { loginSchema } from "src/validation";
import styles from "./Login.module.scss";

export default function Login() {
  interface FormType {
    mail: string;
    password: string;
  }
  const [userLogin, { isSuccess }] = useLoginMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: FormType) => {
    userLogin({
      mail: values.mail,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Logged successfully");
    }
  }, [isSuccess]);

  return (
    <div className={styles.loginBg}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className={styles.form}
      >
        <Typography.Title className={styles.title}>Login</Typography.Title>
        <Form.Item label="Email" name="mail">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                size="large"
                placeholder="example@crocusoft.com"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="mail"
          />
        </Form.Item>
        {errors.mail && <span className="errorMsg">{errors.mail.message}</span>}
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
        <Form.Item>
          <Link to="/forgot-password" className={styles.forgot}>
            Forgot password
          </Link>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submit}
          size="large"
          block
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
