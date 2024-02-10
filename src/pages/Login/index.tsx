import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useLoginUserMutation } from "src/services/authApi/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "src/redux/features/auth/AuthSlice";
export default function Login() {

  const dispatch = useDispatch();
  const [loginUserMutation] = useLoginUserMutation();

  const onFinish = async (values: { mail: string; password: string }) => {
    try {
      const response = await loginUserMutation({ mail: values.mail, password: values.password }).unwrap();
      dispatch(setUser(response));
      console.log(response)
    } catch (error) {
      console.error("Login failed:", error);
    }
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
