import { ConfigProvider, theme } from "antd";
import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Auxilliary, Cover, Header, SideMenu } from "shared/index";
import ForgotPassword from "src/pages/ForgotPassword";
import { useAppSelector } from "src/redux/hooks";
import RenderIf from "src/shared/components/RenderIf";
import Spinner from "src/shared/components/Spinner";
import Login from "./Login";
import PrivateRouter from "./PrivateRouter";
const Router = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    user: { access_token },
  } = useAppSelector((state) => state.auth);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#6743C1",
        },
      }}
    >
      <RenderIf condition={Boolean(access_token)}>
        <Auxilliary>
          <SideMenu />
          <Auxilliary>
            <Header setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
            <Cover>
              <Suspense fallback={<Spinner />}>
                <PrivateRouter />
              </Suspense>
            </Cover>
          </Auxilliary>
        </Auxilliary>
      </RenderIf>
      <RenderIf condition={Boolean(!access_token)}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </RenderIf>
    </ConfigProvider>
  );
};

export default Router;
