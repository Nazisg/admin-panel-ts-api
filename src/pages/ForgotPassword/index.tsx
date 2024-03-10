import { Steps, theme } from "antd";
import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import ChangePassword from "./steps/ChangePassword";
import Email from "./steps/Email";
import OTP from "./steps/OTP";

const ForgotPassword: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [mail, setMail] = useState("");
  const next = () => {
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: "Email",
      content: <Email onNext={next} setMail={setMail} />,
    },
    {
      title: "OTP",
      content: <OTP onNext={next} />,
    },
    {
      title: "Change Password",
      content: <ChangePassword onNext={next} mail={mail} />,
    },
  ];
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className={styles.forgotPage}>
      <div className={styles.forgotContent}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
      </div>
    </div>
  );
};

export default ForgotPassword;
