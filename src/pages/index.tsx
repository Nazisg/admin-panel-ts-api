import { ConfigProvider, theme } from "antd";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Auxilliary, Cover, Header, SideMenu } from "shared/index";
import ForgotPassword from "src/pages/ForgotPassword";
import RenderIf from "src/shared/components/RenderIf";
import Login from "./Login";
import PrivateRouter from "./PrivateRouter";

const Router = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const token = false;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#6743C1",
        },
      }}
    >
      <RenderIf condition={token}>
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
      <RenderIf condition={!token}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </RenderIf>
    </ConfigProvider>
  );
};

export default Router;
