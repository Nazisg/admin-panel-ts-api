import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { useLoginMutation } from "src/redux/api/auth";
import styles from "./Login.module.scss";

export default function Login() {
  const [userLogin] = useLoginMutation();
  const onFinish = async (values: { mail: string; password: string }) => {
    userLogin({
      mail: values.mail,
      password: values.password,
    });
  };

  return (
    <div className={styles.loginBg}>
      <Form onFinish={onFinish} layout="vertical" className={styles.form}>
        <Typography.Title className={styles.title}>Login</Typography.Title>
        <Form.Item name={"mail"} label="Email">
          <Input placeholder="example@crocusoft.com" size="large" />
        </Form.Item>
        <Form.Item name={"password"} label="Password">
          <Input.Password type="password" placeholder="********" size="large" />
        </Form.Item>
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
