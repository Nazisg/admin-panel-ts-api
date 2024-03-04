import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMailMutation } from "src/redux/api/otp";
import { mailSchema } from "src/validation";
import styles from "./Email.module.scss";

const Email = ({ onNext, setMail }) => {
  interface FormType {
    email: string;
  }
  const [mail, { isSuccess }] = useMailMutation();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(mailSchema),
  });
  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  const onSubmit = async () => {
    mail(getValues().email);
    setMail(getValues().email);
  };

  return (
    <Typography className={styles.emailPage}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        layout="vertical"
        className={styles.emailForm}
      >
        <Form.Item name="email" label="Enter your email">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="example@crocusoft.com"
                size="large"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="email"
          />
        </Form.Item>
        {errors.email && (
          <span className="errorMsg">{errors.email.message}</span>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submit}
            size="large"
            block
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Typography>
  );
};

export default Email;
