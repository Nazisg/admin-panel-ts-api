import { ConfigProvider, theme } from "antd";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Auxilliary, Cover, Header, SideMenu } from "shared/index";
import ForgotPassword from "src/pages/ForgotPassword";
import RenderIf from "src/shared/components/RenderIf";
import Login from "./Login";
import PrivateRouter from "./PrivateRouter";
import { useAppSelector } from "src/redux/hooks";
const Router = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const token = true;
  const user  = useAppSelector((state) => state.auth);
console.log(user)
console.log(useAppSelector((state) => state))
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#6743C1",
        },
      }}
    >
      <RenderIf condition={Boolean(user)}>
        <Auxilliary>
          <SideMenu />
          <Auxilliary>
            <Header setIsDarkMode={setIsDarkMode} />
            <Cover>
              <PrivateRouter />
            </Cover>
          </Auxilliary>
        </Auxilliary>
      </RenderIf>
      <RenderIf condition={Boolean(!user)}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </RenderIf>
    </ConfigProvider>
  );
};

export default Router;
