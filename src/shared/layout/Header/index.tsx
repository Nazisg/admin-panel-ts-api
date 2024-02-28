import {
  LockOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Layout,
  Space,
  Tooltip,
  Typography
} from "antd";
import { useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { logout } from "src/redux/features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import ChangePassword from "src/shared/components/ChangePassword";
import styles from "./Header.module.scss";
type ThemeProps = {
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};
const Header: React.FC<ThemeProps> = ({ setIsDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.auth);
  const { Header } = Layout;

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleClick = () => {
    if (setIsDarkMode) {
      setIsDarkMode((previousValue) => !previousValue);
    }
  };

  return (
    <Header className={styles.header}>
      <Space>
        <Typography.Title className={styles.title}>
          {profile.firstName} {profile.lastName}
        </Typography.Title>
        <Avatar icon={<UserOutlined />} />
        <Tooltip placement="top" title="Change password">
          <Button shape="circle" type="primary" ghost onClick={showModal}>
            <LockOutlined />
          </Button>
        </Tooltip>
        <Button shape="circle" type="primary" ghost onClick={handleClick}>
          <MdOutlineLightMode className={styles.ligth} />
          {/* <MoonOutlined /> */}
          {/* <SunOutlined /> */}
        </Button>
        <Tooltip placement="top" title="Logout">
          <Button
            shape="circle"
            type="primary"
            ghost
            onClick={() => dispatch(logout())}
          >
            <PoweroffOutlined />
          </Button>
        </Tooltip>
      </Space>
      <ChangePassword
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Header>
  );
};
export default Header;
