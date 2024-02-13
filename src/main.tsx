import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "shared/components/Spinner";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import "./styles/index.scss";
// import * as dotenv from "dotenv";
// dotenv.config();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<Spinner/>} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
