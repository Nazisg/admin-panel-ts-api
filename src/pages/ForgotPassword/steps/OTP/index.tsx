import { Button, Form, Typography } from "antd";
import { InputOTP } from "antd-input-otp";
import styles from "./OTP.module.scss";
import { useOtpMutation } from "src/redux/api/otp";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "src/validation";
import { useEffect } from "react";

const OTP = ({ onNext }) => {
  interface FormType {
    otp: string[];
  }
  const [otp, { isSuccess }] = useOtpMutation();
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(otpSchema),
  });
  const [form] = Form.useForm();
  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  const onSubmit = async () => {
    const otpValues = getValues().otp?.join('')
    console.log(otpValues, typeof otpValues);
    otp(otpValues);
  };
  return (
    <Typography className={styles.otpPage}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        form={form}
        className={styles.otpForm}
      >
        <Form.Item className={styles.inputs} name="otp" style={{gap:"0.3em"}}>
         <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputOTP
              inputStyle={{padding:"4px", maxWidth:"55px"}}
              autoSubmit={form}
              size="large"
              inputType="numeric"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
            )}
            name="otp"
          />
        </Form.Item>
        {errors.otp && (
          <span className="errorMsg">{errors.otp.message}</span>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Verify Code
          </Button>
        </Form.Item>
      </Form>
    </Typography>
  );
};
export default OTP;
