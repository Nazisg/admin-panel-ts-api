import { Button, Form, Typography } from "antd";
import { InputOTP } from "antd-input-otp";
import styles from "./OTP.module.scss";
import { useOtpMutation } from "src/redux/api/otp";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "src/validation";
import { useEffect, useState } from "react";

const OTP = ({ onNext }) => {
  interface FormType {
    otp: string[];
  }
  const [otp, { isSuccess }] = useOtpMutation();
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(300); // 300 

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      onNext();
    }
  }, [isSuccess, onNext]);

  const handleResendClick = () => {
    setCountdown(300); // 300 
    const otpValues = getValues().otp?.join("");
    otp(otpValues);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(timer); 
        }
        return prevCountdown > 0 ? prevCountdown - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]); 

  const formattedCountdown = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, "0")}:${(countdown % 60).toString().padStart(2, "0")}`;

  const onSubmit = async () => {
    const otpValues = getValues().otp?.join("");
    otp(otpValues);
  };

  return (
    <Typography className={styles.otpPage}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        form={form}
        className={styles.otpForm}
      >
        <Form.Item>
          <Typography className={styles.title}>
            Enter the OTP code we sent to your email {" "}
            {countdown === 0 ? (
              <span className={styles.link} onClick={handleResendClick}>
                Resend code
              </span>
            ) : (
              <span className={styles.time}>{formattedCountdown}</span>
            )}
          </Typography>
        </Form.Item>
        <Form.Item
          className={styles.inputs}
          name="otp"
          style={{ gap: "0.3em" }}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputOTP
                inputStyle={{ padding: "4px", maxWidth: "55px" }}
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
        {errors.otp && <span className="errorMsg">{errors.otp.message}</span>}
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
